from django.db import models

class SignLanguageDetection(models.Model):
    """Model for storing sign language detection results"""
    timestamp = models.DateTimeField(auto_now_add=True)
    input_image = models.ImageField(upload_to='sign_detections/', null=True, blank=True)
    detected_sign = models.CharField(max_length=100)
    confidence = models.FloatField()
    
    def __str__(self):
        return f"{self.detected_sign} ({self.confidence:.2f}) - {self.timestamp}"

class SignLanguageTranslation(models.Model):
    """Model for storing text to sign language translations"""
    timestamp = models.DateTimeField(auto_now_add=True)
    input_text = models.TextField()
    translated_signs = models.JSONField()
    
    def __str__(self):
        return f"Translation: {self.input_text[:30]}... - {self.timestamp}"

class UserPreference(models.Model):
    """Model for storing user preferences"""
    session_id = models.CharField(max_length=100, unique=True)
    preferred_language = models.CharField(max_length=50, default='en')
    sign_display_speed = models.FloatField(default=2.0)  # seconds per sign
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"User {self.session_id} - {self.preferred_language}"
