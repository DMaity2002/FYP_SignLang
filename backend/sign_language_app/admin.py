from django.contrib import admin
from .models import SignLanguageDetection, SignLanguageTranslation, UserPreference

@admin.register(SignLanguageDetection)
class SignLanguageDetectionAdmin(admin.ModelAdmin):
    list_display = ('detected_sign', 'confidence', 'timestamp')
    list_filter = ('detected_sign', 'timestamp')
    search_fields = ('detected_sign',)

@admin.register(SignLanguageTranslation)
class SignLanguageTranslationAdmin(admin.ModelAdmin):
    list_display = ('input_text', 'timestamp')
    list_filter = ('timestamp',)
    search_fields = ('input_text',)

@admin.register(UserPreference)
class UserPreferenceAdmin(admin.ModelAdmin):
    list_display = ('session_id', 'preferred_language', 'sign_display_speed', 'updated_at')
    list_filter = ('preferred_language', 'updated_at')
    search_fields = ('session_id',)
