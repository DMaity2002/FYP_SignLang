from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
import json
import base64
from PIL import Image
import io
import numpy as np

from .models import SignLanguageDetection, SignLanguageTranslation, UserPreference

class SignLanguageAPITests(TestCase):
    def setUp(self):
        self.client = APIClient()
        
    def test_detect_sign_api(self):
        """Test the sign detection API endpoint"""
        # Create a simple test image
        img = Image.new('RGB', (100, 100), color='red')
        img_byte_arr = io.BytesIO()
        img.save(img_byte_arr, format='JPEG')
        img_byte_arr = img_byte_arr.getvalue()
        
        # Encode image to base64
        base64_img = base64.b64encode(img_byte_arr).decode('utf-8')
        
        # Make API request
        url = reverse('detect_sign')
        data = {'image': f'data:image/jpeg;base64,{base64_img}'}
        
        # Note: This test will fail in actual testing environment without the model
        # This is just to verify the API structure
        response = self.client.post(url, data=json.dumps(data), content_type='application/json')
        
        # Since we don't have the model loaded in tests, we expect a 503 error
        self.assertEqual(response.status_code, status.HTTP_503_SERVICE_UNAVAILABLE)
        
    def test_text_to_sign_api(self):
        """Test the text to sign API endpoint"""
        url = reverse('text_to_sign')
        data = {'text': 'Hello World'}
        
        response = self.client.post(url, data=json.dumps(data), content_type='application/json')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['text'], 'Hello World')
        self.assertEqual(len(response.data['signs']), 2)  # Two words
        
    def test_update_preferences_api(self):
        """Test the update preferences API endpoint"""
        url = reverse('update_preferences')
        data = {
            'session_id': 'test_session',
            'language': 'hi',
            'sign_speed': 1.5
        }
        
        response = self.client.post(url, data=json.dumps(data), content_type='application/json')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['session_id'], 'test_session')
        self.assertEqual(response.data['language'], 'hi')
        self.assertEqual(response.data['sign_speed'], 1.5)
        
        # Verify database entry
        pref = UserPreference.objects.get(session_id='test_session')
        self.assertEqual(pref.preferred_language, 'hi')
        self.assertEqual(pref.sign_display_speed, 1.5)
