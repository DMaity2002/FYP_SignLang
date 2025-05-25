from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import json
import os
import base64
import io

from .models import SignLanguageDetection, SignLanguageTranslation, UserPreference
from sign_detection.utils.detector import SignLanguageDetector

# Initialize the sign language detector
detector = SignLanguageDetector()

@api_view(['POST'])
def detect_sign(request):
    """API endpoint for sign language detection from image"""
    try:
        data = json.loads(request.body)
        image_data = data.get('image')
        
        if not image_data:
            return Response({"error": "No image data provided"}, status=status.HTTP_400_BAD_REQUEST)
        
        # Detect sign from base64 image
        result = detector.detect_from_base64(image_data)
        
        if "error" in result:
            return Response({"error": result["error"]}, status=status.HTTP_400_BAD_REQUEST)
        
        # Save detection to database if successful
        if "detected_sign" in result:
            detection = SignLanguageDetection(
                detected_sign=result["detected_sign"],
                confidence=result["confidence"]
            )
            detection.save()
        
        return Response(result)
            
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
def text_to_sign(request):
    """API endpoint for converting text to sign language"""
    try:
        data = json.loads(request.body)
        text = data.get('text', '')
        
        if not text:
            return Response({"error": "No text provided"}, status=status.HTTP_400_BAD_REQUEST)
        
        # Process text to get individual words/characters
        words = text.strip().split()
        
        # Map each word/character to corresponding sign
        sign_mappings = []
        for word in words:
            # In a real implementation, this would map to actual sign images
            # For now, we're just returning the word as the sign identifier
            sign_mappings.append({
                "word": word,
                "sign_id": word.lower()
            })
        
        # Save translation to database
        translation = SignLanguageTranslation(
            input_text=text,
            translated_signs=sign_mappings
        )
        translation.save()
        
        return Response({
            "text": text,
            "signs": sign_mappings
        })
        
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
def update_preferences(request):
    """API endpoint for updating user preferences"""
    try:
        data = json.loads(request.body)
        session_id = data.get('session_id')
        language = data.get('language')
        sign_speed = data.get('sign_speed')
        
        if not session_id:
            return Response({"error": "No session ID provided"}, status=status.HTTP_400_BAD_REQUEST)
        
        # Get or create user preferences
        user_pref, created = UserPreference.objects.get_or_create(
            session_id=session_id,
            defaults={
                'preferred_language': language or 'en',
                'sign_display_speed': sign_speed or 2.0
            }
        )
        
        # Update if not created
        if not created:
            if language:
                user_pref.preferred_language = language
            if sign_speed:
                user_pref.sign_display_speed = sign_speed
            user_pref.save()
        
        return Response({
            "session_id": session_id,
            "language": user_pref.preferred_language,
            "sign_speed": user_pref.sign_display_speed
        })
        
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
def text_to_speech(request):
    """API endpoint for text-to-speech conversion"""
    try:
        data = json.loads(request.body)
        text = data.get('text', '')
        language = data.get('language', 'en-US')
        
        if not text:
            return Response({"error": "No text provided"}, status=status.HTTP_400_BAD_REQUEST)
        
        # In a production environment, this would use a TTS service
        # For this implementation, we'll just return success as the frontend
        # handles TTS using the Web Speech API
        
        return Response({
            "success": True,
            "text": text,
            "language": language
        })
        
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

def index(request):
    """Render the main application page"""
    return render(request, 'index.html')
