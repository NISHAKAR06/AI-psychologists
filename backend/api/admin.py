from django.contrib import admin
from .models import User, Doctor, Session, ChatMessage

admin.site.register(User)
admin.site.register(Doctor)
admin.site.register(Session)
admin.site.register(ChatMessage)
