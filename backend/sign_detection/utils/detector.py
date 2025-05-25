import torch
import cv2
import numpy as np
import os
from pathlib import Path

class SignLanguageDetector:
    """
    Class for detecting Indian Sign Language using YOLO model
    """
    def __init__(self, model_path=None):
        """
        Initialize the detector with a YOLO model
        
        Args:
            model_path: Path to the YOLO model file (.pt)
        """
        self.model_path = model_path or os.path.join(os.path.dirname(__file__), 'models', 'best_isl.pt')
        self.model = None
        self.classes = []
        self.load_model()
    
    def load_model(self):
        """Load the YOLO model"""
        try:
            # Check if model file exists
            if not os.path.exists(self.model_path):
                raise FileNotFoundError(f"Model file not found at {self.model_path}")
            
            # Load model from torch hub
            self.model = torch.hub.load('ultralytics/yolov5', 'custom', path=self.model_path)
            
            # Set model parameters
            self.model.conf = 0.45  # Confidence threshold
            self.model.iou = 0.45   # IoU threshold
            self.model.agnostic = False  # Class-agnostic NMS
            self.model.multi_label = False  # Multiple labels per box
            self.model.max_det = 1  # Maximum number of detections
            
            # Get class names
            self.classes = self.model.names
            
            print(f"Model loaded successfully with {len(self.classes)} classes")
            return True
        except Exception as e:
            print(f"Error loading model: {e}")
            return False
    
    def detect(self, image):
        """
        Detect sign language in an image
        
        Args:
            image: Image as numpy array (BGR format from OpenCV)
            
        Returns:
            Dictionary with detection results
        """
        if self.model is None:
            return {"error": "Model not loaded"}
        
        try:
            # Convert BGR to RGB
            if len(image.shape) == 3 and image.shape[2] == 3:
                image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
            
            # Perform inference
            results = self.model(image)
            
            # Process results
            predictions = results.pandas().xyxy[0].to_dict(orient="records")
            
            if not predictions:
                return {"message": "No signs detected"}
            
            # Get best prediction (highest confidence)
            best_prediction = max(predictions, key=lambda x: x['confidence'])
            
            return {
                "detected_sign": best_prediction['name'],
                "confidence": float(best_prediction['confidence']),
                "all_predictions": predictions
            }
            
        except Exception as e:
            return {"error": f"Detection error: {str(e)}"}
    
    def detect_from_base64(self, base64_image):
        """
        Detect sign language from base64 encoded image
        
        Args:
            base64_image: Base64 encoded image string
            
        Returns:
            Dictionary with detection results
        """
        try:
            # Decode base64 image
            import base64
            import io
            from PIL import Image
            
            # Remove data URL prefix if present
            if ',' in base64_image:
                base64_image = base64_image.split(',')[1]
            
            # Decode base64 to image
            image_bytes = base64.b64decode(base64_image)
            image = Image.open(io.BytesIO(image_bytes))
            
            # Convert PIL image to numpy array
            image_np = np.array(image)
            
            # Perform detection
            return self.detect(image_np)
            
        except Exception as e:
            return {"error": f"Base64 decoding error: {str(e)}"}
    
    def get_available_classes(self):
        """Return available sign language classes"""
        return list(self.classes.values()) if self.classes else []
