# Sign Language Image Folder Setup Instructions

## Overview
This document provides instructions for setting up the sign language image folder structure required for the Text to Sign feature of the application. The application uses these images to display the corresponding sign language gestures when converting text to sign language.

## Folder Structure
The sign language images should be organized in the following structure:

```
frontend/
└── public/
    └── sign_images/
        ├── a.png
        ├── b.png
        ├── c.png
        ...
        ├── z.png
        ├── hello.png
        ├── thank.png
        ├── you.png
        ...
```

## Image Requirements

### File Format
- Preferred formats: PNG or JPG/JPEG
- Transparent background (PNG) is recommended for better visual integration
- Resolution: Minimum 300x300 pixels recommended
- File size: Keep under 100KB per image for optimal performance

### Naming Convention
- Lowercase letters for alphabet: `a.png`, `b.png`, etc.
- Lowercase words for common phrases: `hello.png`, `thank.png`, etc.
- Use underscores for multi-word phrases: `thank_you.png`, `good_morning.png`
- Avoid spaces and special characters in filenames

## Required Images

### Alphabet (Required)
All 26 letters of the alphabet (a-z) must be included:
- a.png
- b.png
- ...
- z.png

### Common Words and Phrases (Recommended)
Include images for frequently used words and phrases:
- hello.png
- thank.png
- you.png
- please.png
- sorry.png
- yes.png
- no.png
- help.png
- learn.png
- understand.png

### Numbers (Recommended)
Include images for numbers 0-9:
- 0.png
- 1.png
- ...
- 9.png

## Creating Your Own Images

### Option 1: Photograph Real Signs
1. Use a solid, contrasting background
2. Ensure good lighting with minimal shadows
3. Frame the image to clearly show hand positions
4. Crop and resize to maintain consistency across all images

### Option 2: Create Digital Illustrations
1. Use vector graphics software for clean, scalable images
2. Maintain consistent style across all illustrations
3. Use clear outlines and sufficient contrast
4. Export at appropriate resolution for web use

## Testing Your Images
After setting up your image folder:

1. Place all images in the `public/sign_images/` directory
2. Run the application locally
3. Test the Text to Sign feature with various inputs
4. Verify that images display correctly and consistently

## Offline Support
For offline functionality, ensure all images are included in the service worker cache configuration. The default configuration already includes the `sign_images/` directory.

## Troubleshooting

### Images Not Displaying
- Verify file naming matches exactly what the application expects
- Check file permissions
- Ensure the path is correct: `/sign_images/[filename]`
- Verify image format is supported by all target browsers

### Inconsistent Appearance
- Standardize image dimensions
- Use similar lighting and background for photographed signs
- Maintain consistent style for illustrated signs

## Additional Resources
For reference on Indian Sign Language gestures:
- Indian Sign Language Research and Training Center (ISLRTC) resources
- ISL dictionaries and educational materials
