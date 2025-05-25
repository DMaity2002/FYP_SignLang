import React, { useState, useEffect } from 'react';
import './TextToSignPage.css';
import api from '../../services/api';

const TextToSignPage = () => {
  const [inputText, setInputText] = useState('');
  const [signs, setSigns] = useState([]);
  const [currentSignIndex, setCurrentSignIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [signSpeed, setSignSpeed] = useState(2.0);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [error, setError] = useState(null);

  // Check online status
  useEffect(() => {
    const handleOnlineStatus = () => {
      setIsOffline(!navigator.onLine);
    };

    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOnlineStatus);

    return () => {
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOnlineStatus);
    };
  }, []);

  // Handle sign playback
  useEffect(() => {
    let timer;
    if (isPlaying && signs.length > 0) {
      timer = setTimeout(() => {
        if (currentSignIndex < signs.length - 1) {
          setCurrentSignIndex(currentSignIndex + 1);
        } else {
          setIsPlaying(false);
          setCurrentSignIndex(0);
        }
      }, signSpeed * 1000);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isPlaying, currentSignIndex, signs, signSpeed]);

  // Handle text submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    try {
      setError(null);
      const result = await api.textToSign(inputText);
      setSigns(result.signs);
      setCurrentSignIndex(0);
    } catch (err) {
      console.error('Error converting text to sign:', err);
      setError('Error converting text to sign. ' + (isOffline ? 'You are currently offline.' : ''));
    }
  };

  // Start/stop playback
  const togglePlayback = () => {
    if (signs.length === 0) return;
    setIsPlaying(!isPlaying);
  };

  // Reset to beginning
  const resetPlayback = () => {
    setIsPlaying(false);
    setCurrentSignIndex(0);
  };

  // Get current sign to display
  const getCurrentSign = () => {
    if (signs.length === 0) return null;
    return signs[currentSignIndex];
  };

  // Get sign image path
  const getSignImagePath = (signId) => {
    // In a real implementation, this would map to actual sign images
    // For now, we'll use a placeholder path
    return `/sign_images/${signId}.png`;
  };

  return (
    <div className="text-to-sign-container">
      <h2>Text to Sign Language Converter</h2>
      
      {isOffline && (
        <div className="offline-indicator">
          <span>⚠️ You are offline. Some features may be limited.</span>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="input-form">
        <div className="input-group">
          <label htmlFor="text-input">Enter Text:</label>
          <textarea
            id="text-input"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type text to convert to sign language..."
            rows={4}
            aria-label="Text to convert to sign language"
          />
        </div>
        
        <div className="speed-control">
          <label htmlFor="speed-slider">Sign Display Speed (seconds):</label>
          <input
            id="speed-slider"
            type="range"
            min="0.5"
            max="5"
            step="0.5"
            value={signSpeed}
            onChange={(e) => setSignSpeed(parseFloat(e.target.value))}
            aria-label="Adjust sign display speed"
          />
          <span className="speed-value">{signSpeed}s</span>
        </div>
        
        <button 
          type="submit" 
          className="convert-button"
          aria-label="Convert text to sign language"
        >
          Convert to Sign Language
        </button>
      </form>
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="sign-display">
        <h3>Sign Language Display</h3>
        
        <div className="sign-content">
          {signs.length > 0 ? (
            <>
              <div className="current-sign">
                <div className="sign-image">
                  {/* In a real implementation, this would display actual sign images */}
                  <div className="placeholder-sign">
                    {getCurrentSign()?.word || ''}
                  </div>
                </div>
                <p className="sign-word">{getCurrentSign()?.word || ''}</p>
              </div>
              
              <div className="playback-controls">
                <button 
                  onClick={togglePlayback}
                  className={isPlaying ? 'pause-button' : 'play-button'}
                  aria-label={isPlaying ? "Pause sign playback" : "Play sign sequence"}
                >
                  {isPlaying ? 'Pause' : 'Play'}
                </button>
                
                <button 
                  onClick={resetPlayback}
                  className="reset-button"
                  aria-label="Reset to beginning"
                >
                  Reset
                </button>
              </div>
              
              <div className="progress-indicator">
                <span>{currentSignIndex + 1} of {signs.length}</span>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${((currentSignIndex + 1) / signs.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            </>
          ) : (
            <div className="no-signs">
              <p>Enter text and click "Convert" to see sign language</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="instructions">
        <h3>How to Use</h3>
        <ol>
          <li>Enter the text you want to convert in the text box above</li>
          <li>Adjust the display speed if needed (default is 2 seconds per sign)</li>
          <li>Click "Convert to Sign Language" to see the signs</li>
          <li>Use the Play/Pause and Reset buttons to control the playback</li>
        </ol>
        <p><strong>Note:</strong> This application can work offline with limited functionality.</p>
      </div>
    </div>
  );
};

export default TextToSignPage;
