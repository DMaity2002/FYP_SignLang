import React, { useState, useEffect, useRef } from 'react';
import './CameraComponent.css';
import api from '../../services/api';

const CameraComponent = ({ onDetectionResult, selectedLanguage }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

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

  // Initialize camera
  useEffect(() => {
    const startCamera = async () => {
      try {
        const constraints = {
          video: {
            width: { ideal: 640 },
            height: { ideal: 480 },
            facingMode: 'user'
          }
        };

        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setCameraError(null);
      } catch (err) {
        console.error('Error accessing camera:', err);
        setCameraError('Camera access denied or not available. Please check permissions.');
      }
    };

    startCamera();

    return () => {
      // Cleanup camera stream
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  // Capture and process frame
  const captureFrame = async () => {
    if (!videoRef.current || !canvasRef.current || !isCapturing) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw current video frame to canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    try {
      // Convert canvas to base64 image
      const imageData = canvas.toDataURL('image/jpeg');

      // Send to backend for detection
      const result = await api.detectSign(imageData);
      onDetectionResult(result);
    } catch (error) {
      console.error('Error during sign detection:', error);
      
      // Handle offline scenario
      if (isOffline) {
        onDetectionResult({
          error: 'You are currently offline. Using cached detection if available.',
          offline: true
        });
      }
    }

    // Continue capturing if still in capturing mode
    if (isCapturing) {
      setTimeout(captureFrame, 1000); // Capture every second
    }
  };

  // Toggle capturing state
  const toggleCapture = () => {
    const newState = !isCapturing;
    setIsCapturing(newState);
    
    if (newState) {
      captureFrame();
    }
  };

  // Switch camera (front/back)
  const switchCamera = async () => {
    if (videoRef.current && videoRef.current.srcObject) {
      // Stop current stream
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      
      try {
        // Get current facing mode
        const currentFacingMode = tracks[0].getSettings().facingMode;
        const newFacingMode = currentFacingMode === 'user' ? 'environment' : 'user';
        
        // Start new stream with opposite facing mode
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 640 },
            height: { ideal: 480 },
            facingMode: newFacingMode
          }
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error('Error switching camera:', err);
        setCameraError('Failed to switch camera. Your device may not support multiple cameras.');
      }
    }
  };

  return (
    <div className="camera-container">
      <div className="camera-wrapper">
        {isOffline && (
          <div className="offline-indicator">
            <span>⚠️ You are offline. Some features may be limited.</span>
          </div>
        )}
        
        {cameraError ? (
          <div className="camera-error">
            <p>{cameraError}</p>
            <button 
              className="retry-button"
              onClick={() => window.location.reload()}
              aria-label="Retry camera access"
            >
              Retry
            </button>
          </div>
        ) : (
          <>
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              muted
              className="camera-video"
              aria-label="Camera feed for sign language detection"
            />
            <canvas ref={canvasRef} style={{ display: 'none' }} />
            
            <div className="camera-controls">
              <button 
                className={`capture-button ${isCapturing ? 'active' : ''}`}
                onClick={toggleCapture}
                aria-label={isCapturing ? "Stop detection" : "Start detection"}
              >
                {isCapturing ? 'Stop Detection' : 'Start Detection'}
              </button>
              
              <button 
                className="switch-camera-button"
                onClick={switchCamera}
                aria-label="Switch camera"
              >
                Switch Camera
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CameraComponent;
