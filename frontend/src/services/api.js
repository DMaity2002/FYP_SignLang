// API service for backend communication
import axios from 'axios';

// Base URL for API calls
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Offline detection
const checkOnlineStatus = async () => {
  try {
    await fetch('//google.com', { mode: 'no-cors' });
    return true;
  } catch (err) {
    return false;
  }
};

// API methods
export const api = {
  // Sign to text detection
  detectSign: async (imageData) => {
    try {
      const isOnline = await checkOnlineStatus();
      
      if (!isOnline) {
        // Offline fallback - use cached data if available
        const cachedResponse = localStorage.getItem('lastDetection');
        if (cachedResponse) {
          return JSON.parse(cachedResponse);
        }
        throw new Error('You are offline. Please connect to the internet to use this feature.');
      }
      
      const response = await apiClient.post('/detect-sign/', { image: imageData });
      
      // Cache the successful response for offline use
      localStorage.setItem('lastDetection', JSON.stringify(response.data));
      
      return response.data;
    } catch (error) {
      console.error('Error detecting sign:', error);
      throw error;
    }
  },
  
  // Text to sign conversion
  textToSign: async (text) => {
    try {
      const isOnline = await checkOnlineStatus();
      
      if (!isOnline) {
        // Offline fallback - use basic alphabet mapping
        const offlineMapping = JSON.parse(localStorage.getItem('offlineSignMapping')) || {};
        const words = text.toLowerCase().split(' ');
        const signs = words.map(word => ({
          word,
          sign_id: offlineMapping[word] || word.charAt(0)
        }));
        
        return { text, signs };
      }
      
      const response = await apiClient.post('/text-to-sign/', { text });
      return response.data;
    } catch (error) {
      console.error('Error converting text to sign:', error);
      throw error;
    }
  },
  
  // Update user preferences
  updatePreferences: async (sessionId, language, signSpeed) => {
    try {
      const isOnline = await checkOnlineStatus();
      
      // Store preferences locally for offline use
      const preferences = {
        session_id: sessionId,
        language: language || 'en',
        sign_speed: signSpeed || 2.0
      };
      
      localStorage.setItem('userPreferences', JSON.stringify(preferences));
      
      if (!isOnline) {
        return preferences;
      }
      
      const response = await apiClient.post('/update-preferences/', preferences);
      return response.data;
    } catch (error) {
      console.error('Error updating preferences:', error);
      
      // Return locally stored preferences as fallback
      return JSON.parse(localStorage.getItem('userPreferences'));
    }
  },
  
  // Text to speech conversion
  textToSpeech: async (text, language = 'en-US') => {
    // Using browser's built-in speech synthesis for offline support
    return new Promise((resolve, reject) => {
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = language;
        utterance.onend = () => resolve(true);
        utterance.onerror = (error) => reject(error);
        window.speechSynthesis.speak(utterance);
      } else {
        reject(new Error('Text-to-speech not supported in this browser'));
      }
    });
  },
  
  // Initialize offline data
  initOfflineData: () => {
    // Basic alphabet mapping for offline use
    const basicSignMapping = {
      'a': 'a', 'b': 'b', 'c': 'c', 'd': 'd', 'e': 'e',
      'f': 'f', 'g': 'g', 'h': 'h', 'i': 'i', 'j': 'j',
      'k': 'k', 'l': 'l', 'm': 'm', 'n': 'n', 'o': 'o',
      'p': 'p', 'q': 'q', 'r': 'r', 's': 's', 't': 't',
      'u': 'u', 'v': 'v', 'w': 'w', 'x': 'x', 'y': 'y',
      'z': 'z', 'hello': 'hello', 'thank': 'thank', 'you': 'you',
      'please': 'please', 'sorry': 'sorry', 'yes': 'yes', 'no': 'no'
    };
    
    localStorage.setItem('offlineSignMapping', JSON.stringify(basicSignMapping));
    
    // Default user preferences
    if (!localStorage.getItem('userPreferences')) {
      localStorage.setItem('userPreferences', JSON.stringify({
        session_id: 'offline_user',
        language: 'en',
        sign_speed: 2.0
      }));
    }
  }
};

// Initialize offline data when module is imported
api.initOfflineData();

export default api;
