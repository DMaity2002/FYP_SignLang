# Indian Sign Language Web Application - Architecture Design

## Overview

This document outlines the architecture for the Indian Sign Language web application with three main pages:
1. Sign to Text
2. Text to Sign
3. Learning and Info

The application will use React for the frontend with a minimalistic UI approach, and Django for the backend to handle sign language detection and processing.

## Technology Stack

### Frontend
- **React**: For building the user interface components
- **HTML/CSS**: For structure and styling
- **JavaScript**: For frontend logic and interactivity
- **Web Speech API**: For text-to-speech functionality
- **MediaDevices API**: For camera access
- **LocalStorage/IndexedDB**: For offline functionality

### Backend
- **Django**: For server-side logic and API endpoints
- **Python**: For backend programming
- **YOLO Model**: For sign language detection (using the provided `best_isl.pt` model)
- **OpenCV**: For image processing and computer vision tasks

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Client (Browser)                         │
│                                                                 │
│  ┌─────────────┐      ┌─────────────┐      ┌─────────────┐      │
│  │  Sign to    │      │  Text to    │      │ Learning &  │      │
│  │    Text     │      │    Sign     │      │    Info     │      │
│  └─────────────┘      └─────────────┘      └─────────────┘      │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │                     React Components                        ││
│  └─────────────────────────────────────────────────────────────┘│
└───────────────────────────────┬─────────────────────────────────┘
                                │
                                │ HTTP/API Requests
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                       Django Backend                            │
│                                                                 │
│  ┌─────────────┐      ┌─────────────┐      ┌─────────────┐      │
│  │ Sign        │      │ Translation │      │ Text-to-    │      │
│  │ Detection   │      │ Service     │      │ Speech      │      │
│  └─────────────┘      └─────────────┘      └─────────────┘      │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │                    YOLO Model Integration                   ││
│  └─────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────┘
```

## Component Design

### Frontend Components

#### 1. Sign to Text Page
- **CameraComponent**: Handles camera access and video streaming
- **DetectionDisplay**: Shows real-time feedback from sign language detection
- **TextOutputComponent**: Displays translated text from sign language
- **TextToSpeechButton**: Triggers speech synthesis for the translated text
- **LanguageSelector**: Allows users to select output language

#### 2. Text to Sign Page
- **TextInputComponent**: Accepts text input from users
- **SignLanguageDisplay**: Shows sign language images corresponding to input text
- **TimingControl**: Allows users to adjust the display timing between letters
- **PlaybackControls**: Controls for starting, pausing, and resetting the sign display

#### 3. Learning and Info Page
- **AlphabetChart**: Interactive chart showing Indian Sign Language alphabet
- **LearningModules**: Interactive learning components for sign language
- **InformationSections**: Educational content about Indian Sign Language

#### Shared Components
- **Header**: Navigation and application title
- **Footer**: Credits and additional information
- **AccessibilityControls**: Font size, contrast settings, etc.

### Backend Components

#### 1. Sign Detection Module
- Integrates with the YOLO model (`best_isl.pt`)
- Processes video frames from the frontend
- Returns detected signs and confidence levels

#### 2. Translation Service
- Converts detected signs to text
- Handles translation between different languages
- Manages language-specific processing

#### 3. Text-to-Speech Service
- Converts text to speech in multiple languages
- Handles speech synthesis parameters

## Data Flow

### Sign to Text Flow
1. User enables camera on the Sign to Text page
2. Frontend captures video frames and sends them to the backend
3. Backend processes frames using the YOLO model
4. Detected signs are converted to text
5. Text is translated to the selected language if needed
6. Translated text is sent back to the frontend
7. Frontend displays the text and can convert it to speech on demand

### Text to Sign Flow
1. User enters text in the Text to Sign page
2. Text is processed character by character
3. For each character, the corresponding sign language image is displayed
4. Images are displayed with the user-defined timing (default 2 seconds)
5. The process continues until all characters are displayed

## API Endpoints

### Sign Detection API
- `POST /api/detect/`: Processes image frames and returns detected signs
  - Request: Image frame data
  - Response: Detected sign, confidence level

### Translation API
- `POST /api/translate/`: Translates text between languages
  - Request: Source text, source language, target language
  - Response: Translated text

### Text-to-Speech API
- `POST /api/text-to-speech/`: Converts text to speech
  - Request: Text, language
  - Response: Audio data or URL to audio file

## Offline Functionality

The application will support offline functionality through:
- **Service Workers**: For caching static assets and API responses
- **IndexedDB/LocalStorage**: For storing user preferences and frequently used data
- **Offline Detection**: Limited sign detection capabilities when offline
- **Cached Resources**: Pre-loaded sign language images and educational content

## Accessibility Features

The application will include the following accessibility features:
- **Screen Reader Compatibility**: Proper ARIA attributes and semantic HTML
- **Keyboard Navigation**: Full keyboard support for all features
- **High Contrast Mode**: For users with visual impairments
- **Adjustable Text Size**: For better readability
- **Focus Indicators**: Clear visual cues for keyboard focus
- **Alternative Text**: For all images and visual elements
- **Reduced Motion Option**: For users sensitive to animations

## Folder Structure

```
project_root/
│
├── frontend/                  # React frontend application
│   ├── public/
│   │   ├── index.html
│   │   ├── manifest.json
│   │   └── sign_images/       # Sign language images folder
│   │       ├── a.png
│   │       ├── b.png
│   │       └── ...
│   │
│   ├── src/
│   │   ├── components/        # React components
│   │   │   ├── SignToText/
│   │   │   ├── TextToSign/
│   │   │   ├── Learning/
│   │   │   └── shared/
│   │   │
│   │   ├── services/          # API services
│   │   ├── utils/             # Utility functions
│   │   ├── App.js
│   │   └── index.js
│   │
│   ├── package.json
│   └── README.md
│
├── backend/                   # Django backend application
│   ├── manage.py
│   │
│   ├── sign_language_project/  # Django project settings
│   │   ├── __init__.py
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   │
│   ├── sign_detection/        # Sign detection app
│   │   ├── __init__.py
│   │   ├── admin.py
│   │   ├── apps.py
│   │   ├── models.py
│   │   ├── views.py
│   │   ├── urls.py
│   │   └── utils/
│   │       ├── detection.py
│   │       └── translation.py
│   │
│   ├── models/                # ML models folder
│   │   └── best_isl.pt        # YOLO model file
│   │
│   └── requirements.txt       # Python dependencies
│
└── README.md                  # Project documentation
```

## Sign Language Image Folder Structure

The sign language images should be organized as follows:
- Each image should be named according to the character it represents (e.g., `a.png`, `b.png`)
- Images should be stored in the `frontend/public/sign_images/` directory
- All images should have consistent dimensions and format
- Special characters should have appropriate naming (e.g., `space.png`, `comma.png`)

## Implementation Considerations

1. **Performance Optimization**:
   - Optimize image processing to reduce latency
   - Use efficient data transfer between frontend and backend
   - Implement caching strategies for frequently used data

2. **Security**:
   - Implement proper input validation
   - Secure API endpoints
   - Handle user data responsibly

3. **Scalability**:
   - Design components for reusability
   - Structure code for easy maintenance and extension
   - Use modular approach for adding new features

4. **Responsive Design**:
   - Ensure application works well on various screen sizes
   - Optimize camera usage for mobile devices
   - Adapt UI elements for touch interfaces

5. **Cross-Browser Compatibility**:
   - Test on major browsers (Chrome, Firefox, Safari, Edge)
   - Implement fallbacks for unsupported features
   - Use progressive enhancement approach
