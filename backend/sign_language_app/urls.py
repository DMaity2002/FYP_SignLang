from django.urls import path
from . import views

urlpatterns = [
    path('api/detect-sign/', views.detect_sign, name='detect_sign'),
    path('api/text-to-sign/', views.text_to_sign, name='text_to_sign'),
    path('api/update-preferences/', views.update_preferences, name='update_preferences'),
    path('api/text-to-speech/', views.text_to_speech, name='text_to_speech'),
    path('', views.index, name='index'),
]
