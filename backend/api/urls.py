from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.register),
    path('login/', views.user_login),
    path('logout/', views.user_logout),
    path('user/', views.get_user),
    path('psychologists/', views.psychologist_list),
    path('sessions/', views.create_session),
    path('sessions/<uuid:session_id>/', views.get_session),
    path('chat/history/<uuid:session_id>/', views.get_chat_history),
    path('chat/', views.chat),
]
