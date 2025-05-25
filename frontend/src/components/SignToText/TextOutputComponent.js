import React, { useState, useEffect } from 'react';
import './TextOutputComponent.css';
import api from '../../services/api';

const TextOutputComponent = ({ detectionResult, selectedLanguage }) => {
  const [detectedText, setDetectedText] = useState('');
  const [confidence, setConfidence] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (detectionResult && !detectionResult.error) {
      if (detectionResult.detected_sign) {
        setDetectedText(detectionResult.detected_sign);
        setConfidence(detectionResult.confidence * 100);
        
        // Add to history (avoid duplicates in sequence)
        if (history.length === 0 || history[history.length - 1] !== detectionResult.detected_sign) {
          setHistory(prev => [...prev, detectionResult.detected_sign]);
        }
      }
    } else if (detectionResult && detectionResult.error) {
      setDetectedText(detectionResult.error);
      setConfidence(0);
    }
  }, [detectionResult, history]);

  // Text to speech function
  const speakText = async () => {
    if (!detectedText || isSpeaking) return;
    
    try {
      setIsSpeaking(true);
      await api.textToSpeech(detectedText, selectedLanguage);
    } catch (error) {
      console.error('Text-to-speech error:', error);
    } finally {
      setIsSpeaking(false);
    }
  };

  // Speak full sentence from history
  const speakSentence = async () => {
    if (history.length === 0 || isSpeaking) return;
    
    try {
      setIsSpeaking(true);
      const sentence = history.join(' ');
      await api.textToSpeech(sentence, selectedLanguage);
    } catch (error) {
      console.error('Text-to-speech error:', error);
    } finally {
      setIsSpeaking(false);
    }
  };

  // Clear history
  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <div className="text-output-container">
      <div className="current-detection">
        <h3>Detected Sign</h3>
        <div className="detection-result" aria-live="polite">
          <p className="detected-text">{detectedText || 'No sign detected'}</p>
          {confidence > 0 && (
            <p className="confidence">Confidence: {confidence.toFixed(1)}%</p>
          )}
        </div>
        <button 
          className="speak-button"
          onClick={speakText}
          disabled={!detectedText || isSpeaking}
          aria-label="Speak detected text"
        >
          {isSpeaking ? 'Speaking...' : 'Speak'}
        </button>
      </div>

      <div className="detection-history">
        <div className="history-header">
          <h3>Detection History</h3>
          <button 
            className="clear-button"
            onClick={clearHistory}
            disabled={history.length === 0}
            aria-label="Clear detection history"
          >
            Clear
          </button>
        </div>
        
        <div className="history-content">
          {history.length > 0 ? (
            <>
              <p className="sentence">{history.join(' ')}</p>
              <button 
                className="speak-sentence-button"
                onClick={speakSentence}
                disabled={isSpeaking}
                aria-label="Speak full sentence"
              >
                {isSpeaking ? 'Speaking...' : 'Speak Sentence'}
              </button>
            </>
          ) : (
            <p className="no-history">No detection history yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TextOutputComponent;
