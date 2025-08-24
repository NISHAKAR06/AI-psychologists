from django.urls import path
from . import views

urlpatterns = [
    path('psychologists/', views.psychologist_list),
    path('sessions/', views.create_session),
    path('sessions/<uuid:session_id>/', views.get_session),
    path('chat/history/<uuid:session_id>/', views.get_chat_history),
    path('chat/', views.chat),
]
