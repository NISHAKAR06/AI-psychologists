from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Session, ChatMessage
import json

def psychologist_list(request):
    psychologists = [
        {
            "type": "anxiety",
            "name": "Dr. Sarah",
            "specialization": "Anxiety & Panic Disorders",
            "description": "Specialized in helping with anxiety, panic attacks, and worry management"
        },
        {
            "type": "depression",
            "name": "Dr. Michael", 
            "specialization": "Depression & Mood Disorders",
            "description": "Expert in depression, low mood, and building resilience"
        },
        {
            "type": "academic_stress",
            "name": "Dr. Priya",
            "specialization": "Academic & Study Stress",
            "description": "Focused on student stress, exam anxiety, and academic performance"
        },
        {
            "type": "relationships",
            "name": "Dr. Emma",
            "specialization": "Relationship Counseling",
            "description": "Specialized in relationship issues, communication, and interpersonal skills"
        },
        {
            "type": "general",
            "name": "Dr. Alex",
            "specialization": "General Counseling",
            "description": "Provides general psychological support and guidance"
        }
    ]
    return JsonResponse(psychologists, safe=False)

@csrf_exempt
def create_session(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        session = Session.objects.create(
            psychologist_type=data.get('psychologist_type', 'general'),
            language=data.get('language', 'english')
        )
        return JsonResponse({'id': str(session.id)})
    return JsonResponse({'error': 'Invalid request method'}, status=405)

def get_session(request, session_id):
    try:
        session = Session.objects.get(id=session_id)
        return JsonResponse({
            'id': str(session.id),
            'psychologist_type': session.psychologist_type,
            'language': session.language,
            'created_at': session.created_at,
            'is_active': session.is_active
        })
    except Session.DoesNotExist:
        return JsonResponse({'error': 'Session not found'}, status=404)

def get_chat_history(request, session_id):
    messages = ChatMessage.objects.filter(session_id=session_id).order_by('timestamp')
    return JsonResponse([
        {
            'id': str(message.id),
            'session_id': str(message.session.id),
            'message': message.message,
            'is_user': message.is_user,
            'timestamp': message.timestamp,
            'psychologist_type': message.psychologist_type
        } for message in messages
    ], safe=False)

def chat(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        session = Session.objects.get(id=data['session_id'])
        
        # Save user message
        ChatMessage.objects.create(
            session=session,
            message=data['message'],
            is_user=True,
            psychologist_type=data['psychologist_type']
        )
        
        import requests
        
        # Call FastAPI AI service
        fastapi_url = "http://127.0.0.1:8001/chat"  # Assuming FastAPI runs on port 8001
        try:
            response = requests.post(fastapi_url, json={
                "message": data['message'],
                "session_id": data['session_id'],
                "psychologist_type": data['psychologist_type']
            })
            response.raise_for_status()
            ai_response = response.json()['response']
        except requests.exceptions.RequestException as e:
            return JsonResponse({'error': str(e)}, status=500)
        
        # Save AI message
        ChatMessage.objects.create(
            session=session,
            message=ai_response,
            is_user=False,
            psychologist_type=data['psychologist_type']
        )
        
        return JsonResponse({'response': ai_response})
    return JsonResponse({'error': 'Invalid request method'}, status=405)
