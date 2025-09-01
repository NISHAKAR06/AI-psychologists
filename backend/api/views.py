from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login, logout
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Session, ChatMessage, User, Doctor
from .serializers import UserSerializer, DoctorSerializer, SessionSerializer, ChatMessageSerializer
import json

@api_view(['POST'])
def register(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        if user.user_type == 'doctor' and 'specialization' in request.data and 'description' in request.data:
            doctor_data = {
                'user': user.id,
                'specialization': request.data.get('specialization'),
                'description': request.data.get('description')
            }
            doctor_serializer = DoctorSerializer(data=doctor_data)
            if doctor_serializer.is_valid():
                doctor_serializer.save()
            else:
                # If doctor creation fails, delete the created user to avoid orphaned users
                user.delete()
                return Response(doctor_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def user_login(request):
    user = authenticate(
        email=request.data['email'],
        password=request.data['password']
    )
    if user is not None:
        login(request, user)
        serializer = UserSerializer(user)
        return Response(serializer.data)
    return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def user_logout(request):
    logout(request)
    return Response({'message': 'Logout successful'})

@api_view(['GET'])
def get_user(request):
    if request.user.is_authenticated:
        serializer = UserSerializer(request.user)
        return Response(serializer.data)
    return Response({'error': 'User not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['GET'])
def psychologist_list(request):
    doctors = Doctor.objects.all()
    serializer = DoctorSerializer(doctors, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def create_session(request):
    serializer = SessionSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_session(request, session_id):
    try:
        session = Session.objects.get(id=session_id)
        serializer = SessionSerializer(session)
        return Response(serializer.data)
    except Session.DoesNotExist:
        return Response({'error': 'Session not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def get_chat_history(request, session_id):
    messages = ChatMessage.objects.filter(session_id=session_id).order_by('timestamp')
    serializer = ChatMessageSerializer(messages, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def chat(request):
    serializer = ChatMessageSerializer(data=request.data)
    if serializer.is_valid():
        chat_message = serializer.save()
        
        import requests
        
        # Call FastAPI AI service
        fastapi_url = "http://127.0.0.1:8001/chat"  # Assuming FastAPI runs on port 8001
        try:
            response = requests.post(fastapi_url, json={
                "message": chat_message.message,
                "session_id": str(chat_message.session.id),
                "psychologist_type": chat_message.psychologist_type
            })
            response.raise_for_status()
            ai_response = response.json()['response']
        except requests.exceptions.RequestException as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        # Save AI message
        ai_message = ChatMessage.objects.create(
            session=chat_message.session,
            message=ai_response,
            is_user=False,
            psychologist_type=chat_message.psychologist_type
        )
        
        return Response({'response': ai_response})
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
