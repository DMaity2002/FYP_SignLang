# Deployment Process Documentation

## Overview
This document outlines the process for deploying the Indian Sign Language Web Application to a production environment. The application consists of a React frontend and a Django backend with machine learning capabilities.

## Prerequisites
- Node.js (v14.0.0 or higher)
- Python (v3.8 or higher)
- pip (Python package manager)
- Git
- Access to a server or hosting platform

## Frontend Deployment

### Building the React Application
1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a production build:
   ```
   npm run build
   ```
   This will create a `build` directory with optimized production files.

### Configuring Environment Variables
Create a `.env` file in the frontend directory with the following variables:
```
REACT_APP_API_URL=https://your-backend-domain.com/api
```

### Deploying to a Static Hosting Service
You can deploy the frontend to any static hosting service:

#### Option 1: Netlify
1. Install Netlify CLI:
   ```
   npm install -g netlify-cli
   ```

2. Deploy the build folder:
   ```
   netlify deploy --prod --dir=build
   ```

#### Option 2: Vercel
1. Install Vercel CLI:
   ```
   npm install -g vercel
   ```

2. Deploy the build folder:
   ```
   vercel --prod
   ```

#### Option 3: GitHub Pages
1. Add homepage to package.json:
   ```json
   "homepage": "https://yourusername.github.io/repo-name"
   ```

2. Install gh-pages:
   ```
   npm install --save-dev gh-pages
   ```

3. Add deploy scripts to package.json:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d build"
   }
   ```

4. Deploy:
   ```
   npm run deploy
   ```

## Backend Deployment

### Preparing the Django Application
1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Create a virtual environment:
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

4. Create a production settings file (`settings_prod.py`) with:
   - Debug set to False
   - Proper secret key management
   - Database configuration
   - Allowed hosts configuration
   - CORS settings

### Database Setup
1. Run migrations:
   ```
   python manage.py migrate
   ```

2. Create a superuser:
   ```
   python manage.py createsuperuser
   ```

### YOLO Model Setup
1. Ensure the YOLO model file (`best_isl.pt`) is placed in the `models` directory.
2. Verify the model path in the detector configuration.

### Option 1: Deploying to PythonAnywhere
1. Upload your code to PythonAnywhere or clone from Git
2. Create a virtual environment and install requirements
3. Configure WSGI file to point to your Django application
4. Set up static files directory

### Option 2: Deploying to Heroku
1. Create a Procfile:
   ```
   web: gunicorn sign_language_project.wsgi --log-file -
   ```

2. Install Gunicorn:
   ```
   pip install gunicorn
   ```

3. Update requirements.txt:
   ```
   pip freeze > requirements.txt
   ```

4. Create a runtime.txt file:
   ```
   python-3.9.7
   ```

5. Deploy to Heroku:
   ```
   heroku create your-app-name
   git push heroku main
   heroku run python manage.py migrate
   ```

### Option 3: Deploying to a VPS (e.g., DigitalOcean, AWS)
1. Set up a server with Nginx and Gunicorn
2. Configure Nginx to serve static files and proxy requests to Gunicorn
3. Set up SSL with Let's Encrypt
4. Configure systemd to manage the Gunicorn process

## Connecting Frontend and Backend
1. Update the API URL in the frontend environment variables to point to your deployed backend
2. Ensure CORS is properly configured on the backend to allow requests from the frontend domain

## Setting Up Continuous Integration/Deployment (Optional)
1. Configure GitHub Actions or similar CI/CD tool
2. Set up automated testing before deployment
3. Configure automatic deployment on successful merges to main branch

## Post-Deployment Verification
1. Test the Sign to Text functionality
2. Test the Text to Sign functionality
3. Verify the Learning section works correctly
4. Check offline functionality
5. Test on different devices and browsers

## Troubleshooting Common Issues
- **CORS errors**: Verify CORS settings in Django
- **Model loading errors**: Check file paths and permissions
- **Static files not loading**: Verify Nginx configuration
- **API connection issues**: Check network settings and firewall rules

## Maintenance
1. Regularly update dependencies
2. Monitor server logs for errors
3. Back up the database regularly
4. Update the YOLO model as improved versions become available
