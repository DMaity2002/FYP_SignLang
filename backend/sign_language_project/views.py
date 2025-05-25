from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
import json
import base64
import os
import cv2
import numpy as np
import tempfile
import sys
import logging

# Import the sign language detection module
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from backend.indian_sign_language_detection import process_single_image, load_model

# Set up logging
logger = logging.getLogger(__name__)

# Initialize the model
model = None
try:
    model = load_model()
    logger.info("YOLO model loaded successfully")
except Exception as e:
    logger.error(f"Error loading YOLO model: {str(e)}")

@csrf_exempt
def detect_sign(request):
    """
    API endpoint to detect sign language from an image
    """
    if request.method != 'POST':
        return JsonResponse({'error': 'Only POST requests are allowed'}, status=405)
    
    try:
        data = json.loads(request.body)
        
        # Check if we're in offline mode (for testing without model)
        offline_mode = data.get('offline_mode', False)
        
        if offline_mode:
            # Return mock data for testing
            return JsonResponse({
                'detected_sign': 'HELLO',
                'confidence': 0.95,
                'success': True
            })
        
        # Get the image data from the request
        image_data = data.get('image')
        if not image_data:
            return JsonResponse({'error': 'No image data provided'}, status=400)
        
        # Remove the data URL prefix if present
        if image_data.startswith('data:image'):
            image_data = image_data.split(',')[1]
        
        # Decode the base64 image
        image_bytes = base64.b64decode(image_data)
        
        # Convert to numpy array
        nparr = np.frombuffer(image_bytes, np.uint8)
        
        # Decode image
        image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        
        if image is None:
            return JsonResponse({'error': 'Failed to decode image'}, status=400)
        
        # Process the image using the YOLO model
        global model
        if model is None:
            try:
                model = load_model()
            except Exception as e:
                return JsonResponse({'error': f'Model not available: {str(e)}'}, status=500)
        
        results = process_single_image(image, model)
        
        # Extract detection results
        if results and hasattr(results, 'boxes') and len(results.boxes) > 0:
            # Get the class with highest confidence
            class_id = int(results.boxes.cls[0].item())
            confidence = float(results.boxes.conf[0].item())
            
            # Get the class name from the model
            class_name = results.names[class_id]
            
            return JsonResponse({
                'detected_sign': class_name,
                'confidence': confidence,
                'success': True
            })
        else:
            return JsonResponse({
                'detected_sign': '',
                'confidence': 0,
                'success': True
            })
            
    except Exception as e:
        logger.error(f"Error in detect_sign: {str(e)}")
        return JsonResponse({'error': str(e)}, status=500)

@csrf_exempt
def translate_text(request):
    """
    API endpoint to translate text between languages
    """
    if request.method != 'POST':
        return JsonResponse({'error': 'Only POST requests are allowed'}, status=405)
    
    try:
        data = json.loads(request.body)
        text = data.get('text', '')
        source_lang = data.get('source_lang', 'en')
        target_lang = data.get('target_lang', 'en')
        
        # In a real implementation, this would call a translation service
        # For now, we'll just return the original text
        
        return JsonResponse({
            'translated_text': text,
            'source_lang': source_lang,
            'target_lang': target_lang,
            'success': True
        })
        
    except Exception as e:
        logger.error(f"Error in translate_text: {str(e)}")
        return JsonResponse({'error': str(e)}, status=500)

@csrf_exempt
def text_to_speech(request):
    """
    API endpoint to convert text to speech
    """
    if request.method != 'POST':
        return JsonResponse({'error': 'Only POST requests are allowed'}, status=405)
    
    try:
        data = json.loads(request.body)
        text = data.get('text', '')
        language = data.get('language', 'en')
        
        # In a real implementation, this would generate audio using a TTS service
        # For now, we'll just return a success message
        
        return JsonResponse({
            'success': True,
            'message': 'Text-to-speech conversion would happen here'
        })
        
    except Exception as e:
        logger.error(f"Error in text_to_speech: {str(e)}")
        return JsonResponse({'error': str(e)}, status=500)
