import React, { useState, useEffect } from 'react';
import CameraComponent from './CameraComponent';
import TextOutputComponent from './TextOutputComponent';
import LanguageSelector from './LanguageSelector';
import './SignToTextPage.css';
import { detectSign, translateText } from '../../services/api';

const SignToTextPage = () => {
  const [detectedText, setDetectedText] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('en-IN');
  const [isProcessing, setIsProcessing] = useState(false);
  const [offlineMode, setOfflineMode] = useState(false);
  const [error, setError] = useState(null);

  // Check for online/offline status
  useEffect(() => {
    const handleOnlineStatus = () => {
      setOfflineMode(!navigator.onLine);
    };

    // Set initial status
    handleOnlineStatus();

    // Add event listeners for online/offline events
    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOnlineStatus);

    // Clean up event listeners
    return () => {
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOnlineStatus);
    };
  }, []);

  // Handle frame from camera component
  const handleFrame = async (imageData) => {
    if (isProcessing || !imageData) return;
    
    // Set processing flag to avoid too many requests
    setIsProcessing(true);
    
    try {
      // Call the backend API to detect sign language
      const result = await detectSign(imageData, offlineMode);
      
      if (result.success && result.detected_sign) {
        // If we have a detected sign and it's different from current text, translate it
        if (result.detected_sign !== detectedText && selectedLanguage !== 'en') {
          try {
            const translationResult = await translateText(
              result.detected_sign,
              'en',
              selectedLanguage.split('-')[0]
            );
            
            if (translationResult.success) {
              setDetectedText(translationResult.translated_text);
            } else {
              setDetectedText(result.detected_sign);
            }
          } catch (translationError) {
            // If translation fails, use the original detected text
            setDetectedText(result.detected_sign);
            console.error('Translation error:', translationError);
          }
        } else {
          // If no translation needed or same as current, just set the detected text
          setDetectedText(result.detected_sign);
        }
      }
      
      setError(null);
    } catch (err) {
      console.error('Error detecting sign:', err);
      setError('Failed to detect sign language. Please try again.');
      
      // In offline mode or if API fails, use mock detection
      if (offlineMode) {
        const mockDetections = [
          'HELLO',
          'THANK YOU',
          'PLEASE',
          'HELP',
          'GOOD MORNING'
        ];
        
        const randomIndex = Math.floor(Math.random() * mockDetections.length);
        setDetectedText(mockDetections[randomIndex]);
      }
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle language change
  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
  };

  return (
    <div className="sign-to-text-page">
      <header className="page-header">
        <h1>Sign to Text</h1>
        {offlineMode && (
          <div className="offline-indicator" role="alert">
            Offline Mode - Limited functionality available
          </div>
        )}
        {error && (
          <div className="error-indicator" role="alert">
            {error}
          </div>
        )}
      </header>
      
      <main>
        <CameraComponent onFrame={handleFrame} />
        
        <LanguageSelector 
          selectedLanguage={selectedLanguage}
          onLanguageChange={handleLanguageChange}
        />
        
        <TextOutputComponent 
          detectedText={detectedText}
          selectedLanguage={selectedLanguage}
        />
      </main>
      
      <div className="instructions">
        <h2>How to use:</h2>
        <ol>
          <li>Position yourself in front of the camera</li>
          <li>Make clear sign language gestures</li>
          <li>The detected signs will appear as text below</li>
          <li>Change the output language using the selector</li>
          <li>Use the speak button to hear the detected text</li>
        </ol>
      </div>
    </div>
  );
};

export default SignToTextPage;
