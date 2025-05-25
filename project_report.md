# Indian Sign Language Web Application - Project Report

## Project Overview

This project is a web application for Indian Sign Language translation with three main pages:

1. **Sign to Text**: Captures sign language through the camera and converts it to text
2. **Text to Sign**: Converts text input to sign language displayed letter by letter
3. **Learning and Info**: Educational content about Indian Sign Language with interactive elements

The application uses React for the frontend and Django for the backend, with a YOLO model for sign language detection.

## Technologies Used

### Frontend
- React.js
- HTML/CSS
- Web Speech API for text-to-speech
- MediaDevices API for camera access

### Backend
- Django
- Django REST Framework
- YOLO model for sign language detection
- OpenCV for image processing

## Features Implemented

### Sign to Text Page
- Real-time camera capture with device selection
- Sign language detection using YOLO model
- Text output with translation capabilities
- Text-to-speech functionality
- Language selection for multiple Indian and world languages
- Offline mode with fallback functionality

### Text to Sign Page
- Text input area for user input
- Letter-by-letter sign language display
- Adjustable timing control (default 2 seconds)
- Play/stop controls for sign language display
- Progress tracking to show current letter
- Clear instructions for sign image folder structure

### Learning and Info Page
- Interactive alphabet chart for Indian Sign Language
- Common phrases section with descriptions
- Educational content about Indian Sign Language
- Tab-based navigation between different sections
- External resources and learning tips

### General Features
- Responsive design for all screen sizes
- Accessibility features (keyboard navigation, screen reader support, high contrast)
- Offline detection and functionality
- Error handling and fallback mechanisms
- Minimalistic UI as requested

## Project Structure

```
project_root/
│
├── frontend/                  # React frontend application
│   ├── public/
│   │   ├── index.html
│   │   └── sign_images/       # Sign language images folder
│   │
│   ├── src/
│   │   ├── components/        # React components
│   │   │   ├── SignToText/    # Sign to Text page components
│   │   │   ├── TextToSign/    # Text to Sign page components
│   │   │   ├── Learning/      # Learning page components
│   │   │   └── shared/        # Shared components
│   │   │
│   │   ├── services/          # API services
│   │   ├── utils/             # Utility functions
│   │   ├── App.js             # Main application component
│   │   └── index.js           # Entry point
│   │
│   └── package.json           # Frontend dependencies
│
└── backend/                   # Django backend application
    ├── sign_language_project/ # Django project settings
    ├── sign_language_app/     # Django application
    │   ├── views.py           # API endpoints
    │   └── urls.py            # URL routing
    │
    ├── models/                # ML models folder
    │   └── best_isl.pt        # YOLO model file
    │
    └── indian_sign_language_detection.py # Sign detection module
```

## Setup Instructions

### Backend Setup
1. Navigate to the backend directory: `cd backend`
2. Activate the virtual environment: `source venv/bin/activate`
3. Install dependencies: `pip install -r requirements.txt`
4. Place the YOLO model file (`best_isl.pt`) in the `backend/models/` directory
5. Run the Django server: `python manage.py runserver`

### Frontend Setup
1. Navigate to the frontend directory: `cd frontend`
2. Install dependencies: `npm install`
3. Create a `sign_images` folder in the `public` directory
4. Add sign language images for each letter (a.png, b.png, etc.) to the `sign_images` folder
5. Run the React development server: `npm start`

## Sign Images Folder Structure

For the Text to Sign page to work properly, you need to create a folder with sign language images:

1. Create a folder named `sign_images` in the `frontend/public/` directory
2. Add images for each letter with the following naming convention:
   - Lowercase letters: a.png, b.png, c.png, etc.
   - Numbers: 0.png, 1.png, 2.png, etc.
   - Space: space.png
   - Unknown characters: unknown.png
3. Images should be clear with consistent dimensions (recommended 200x200 pixels)

## API Endpoints

The backend provides the following API endpoints:

- `POST /api/detect/`: Processes image frames and returns detected signs
- `POST /api/translate/`: Translates text between languages
- `POST /api/text-to-speech/`: Converts text to speech

## Accessibility Features

The application includes several accessibility features:

- Keyboard navigation support
- Screen reader compatibility with ARIA attributes
- High contrast mode
- Adjustable text size
- Focus indicators for keyboard users
- Reduced motion option
- Responsive design for all screen sizes

## Offline Functionality

The application supports offline functionality:

- Detection of offline status
- Fallback mechanisms for API failures
- Local processing when possible
- Clear indicators when in offline mode

## Future Enhancements

Potential future enhancements for the application:

1. Add support for continuous sign language detection (sentences)
2. Implement user accounts to save preferences
3. Expand the sign language database
4. Add more interactive learning exercises
5. Implement real-time translation services for more languages
6. Add mobile app versions

## Conclusion

This Indian Sign Language web application provides a comprehensive solution for sign language translation and learning. With its three main pages (Sign to Text, Text to Sign, and Learning), it offers a complete platform for users to interact with Indian Sign Language in various ways. The application is built with accessibility and offline functionality in mind, ensuring it can be used by a wide range of users in different contexts.
