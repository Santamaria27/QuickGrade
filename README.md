# Quick Grade

Quick Grade is an automated grading platform designed to assist teachers in evaluating written answer papers. The platform uses advanced image processing and smart evaluation techniques to streamline the grading process and save time.

---

## Features

- Easy image upload and management  
- Automatic text extraction and preprocessing  
- Smart grading based on answer schemes  
- Instant score retrieval and display

---

## Technical Workflow

1. **Image Uploading**  
   Upload and store images.

2. **Preprocessing**  
   Use OpenCV for noise reduction and binarization of the image.

3. **Text Extraction**  
   Process the preprocessed image with Google Cloud Vision AI to extract text.

4. **Text Structuring**  
   Organize extracted text into a suitable format.

5. **Grading**  
   Use OpenAI's API to analyze the text and calculate scores based on the grading scheme.  
   Save the scores back to the database.

6. **Score Retrieval**  
   Display the scores to the teacher when requested.

---

## Tech Stack

- **Frontend**: React.js (with Vite)  
- **Backend**: Python, FastAPI  
- **Database**: Firebase Firestore  
- **APIs**:  
  - OpenCV for image preprocessing  
  - Google Cloud Vision AI for text extraction  
  - OpenAI API for answer grading  
- **Cloud Storage**: Firebase Cloud Storage
