# Indian Sign Language Application - Local Installation Guide

This guide provides detailed instructions for installing and running the Indian Sign Language application locally on your computer. Local installation ensures reliable camera access for the Sign to Text functionality.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

1. **Python 3.8+** - Required for the Django backend
2. **Node.js 14+** - Required for the React frontend
3. **Git** (optional) - For cloning the repository
4. **Web camera** - For the Sign to Text functionality

## Step 1: Download the Project Files

You can either download the project as a ZIP file or clone it using Git:

```bash
git clone https://github.com/yourusername/indian-sign-language-app.git
cd indian-sign-language-app
```

## Step 2: Set Up the Backend

### Install Python Dependencies

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment:
   ```bash
   # On Windows
   python -m venv venv
   
   # On macOS/Linux
   python3 -m venv venv
   ```

3. Activate the virtual environment:
   ```bash
   # On Windows
   venv\Scripts\activate
   
   # On macOS/Linux
   source venv/bin/activate
   ```

4. Install the required dependencies:
   ```bash
   pip install -r requirements.txt
   ```

   If the requirements.txt file is missing, install the following packages:
   ```bash
   pip install django djangorestframework opencv-python ultralytics torch corsheaders
   ```

### Configure the YOLO Model

1. Create a 'models' directory in the backend folder if it doesn't exist:
   ```bash
   mkdir -p models
   ```

2. Place your YOLO model file (best_isl.pt) in the models directory.

## Step 3: Set Up the Frontend

1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```

2. Install the required dependencies:
   ```bash
   npm install
   ```

3. Create the sign images directory:
   ```bash
   mkdir -p public/sign_images
   ```

4. Add sign language images to the sign_images folder:
   - Lowercase letters: a.png, b.png, c.png, etc.
   - Numbers: 0.png, 1.png, 2.png, etc.
   - Space: space.png
   - Unknown characters: unknown.png

## Step 4: Run the Application

### Start the Backend Server

1. Ensure you're in the backend directory with the virtual environment activated:
   ```bash
   cd backend
   
   # On Windows
   venv\Scripts\activate
   
   # On macOS/Linux
   source venv/bin/activate
   ```

2. Run the Django development server:
   ```bash
   python manage.py runserver
   ```

   The backend server will start at http://localhost:8000

### Start the Frontend Development Server

1. Open a new terminal window/tab
2. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

3. Start the React development server:
   ```bash
   npm start
   ```

   The frontend will start at http://localhost:3000

4. Open your browser and navigate to http://localhost:3000 to use the application

## Using the Application

### Sign to Text Page

1. Navigate to the Sign to Text page
2. Click the "Start Camera" button
3. Allow camera permissions when prompted by your browser
4. Position yourself in front of the camera and make sign language gestures
5. The detected signs will appear as text below
6. Use the language selector to change the output language
7. Use the speak button to hear the detected text

### Text to Sign Page

1. Navigate to the Text to Sign page
2. Enter text in the input area
3. Adjust the display speed if needed
4. Click "Start" to begin the sign language display
5. Each letter will be displayed as its corresponding sign
6. Click "Stop" at any time to pause the display

### Learning Page

1. Navigate to the Learning page
2. Explore the alphabet chart, common phrases, and educational content
3. Click on letters in the alphabet chart to see their corresponding signs
4. Use the tabs to navigate between different sections

## Troubleshooting

### Camera Access Issues

1. **Camera not starting:**
   - Ensure your camera is connected and working
   - Check if other applications are using the camera
   - Try closing and reopening your browser
   - Ensure you've granted camera permissions in your browser settings

2. **Permission denied:**
   - Check browser settings:
     - **Chrome:** Settings > Privacy and security > Site Settings > Camera
     - **Firefox:** Options > Privacy & Security > Permissions > Camera
     - **Edge:** Settings > Cookies and site permissions > Camera
     - **Safari:** Preferences > Websites > Camera

3. **Backend connection issues:**
   - Ensure the backend server is running at http://localhost:8000
   - Check for any error messages in the terminal running the backend

### Frontend Issues

1. **Dependencies not installing:**
   - Try clearing npm cache: `npm cache clean --force`
   - Delete node_modules folder and reinstall: `rm -rf node_modules && npm install`

2. **Application not starting:**
   - Check for error messages in the terminal
   - Ensure ports 3000 and 8000 are not in use by other applications

### Backend Issues

1. **Django server not starting:**
   - Check for error messages in the terminal
   - Ensure the virtual environment is activated
   - Verify all dependencies are installed

2. **YOLO model not loading:**
   - Ensure the model file (best_isl.pt) is in the correct location
   - Check file permissions

## System Requirements

- **Operating System:** Windows 10+, macOS 10.15+, or Ubuntu 18.04+
- **Processor:** Intel Core i5 or equivalent (for real-time detection)
- **RAM:** 8GB minimum, 16GB recommended
- **Storage:** 1GB free space
- **Camera:** Any standard webcam
- **Browser:** Chrome 83+, Firefox 78+, Edge 83+, Safari 14+

## Additional Resources

- Django documentation: https://docs.djangoproject.com/
- React documentation: https://reactjs.org/docs/
- YOLO documentation: https://docs.ultralytics.com/

## Support

If you encounter any issues not covered in this guide, please contact support at [your-email@example.com].
