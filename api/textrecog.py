import os
import firebase_admin
from firebase_admin import storage
from firebase_admin import firestore
from google.cloud import vision_v1
import cv2
import numpy as np
from firebase_admin import credentials

os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = r'gcloud-SA.json'

# Initialize the client with explicit credentials
client = vision_v1.ImageAnnotatorClient()

def download_image_from_storage(image_id):
    bucket = storage.bucket()
    #trial is the name of the folder in which thr images are uploaded. CHECK if its correct
    blob = bucket.blob(f'trial/{image_id}.jpg')  # Replace 'jpg' with the actual image format
    image_data = blob.download_as_bytes()
    return image_data

def preprocess_image(image_data):
    # Convert byte data to numpy array for processing
    np_array = np.frombuffer(image_data, np.uint8)
    # Decode numpy array into an image
    image = cv2.imdecode(np_array, cv2.IMREAD_GRAYSCALE)

    # Preprocessing steps
    # Noise reduction
    denoised_image = cv2.fastNlMeansDenoising(image, None, h=10, templateWindowSize=7, searchWindowSize=21)
    
    # Binarization
    _, binary_image = cv2.threshold(denoised_image, 0, 255, cv2.THRESH_BINARY | cv2.THRESH_OTSU)

    return binary_image

def detect_text(image_data):
    binary_image = preprocess_image(image_data)
    image = vision_v1.Image(content=cv2.imencode('.jpg', binary_image)[1].tobytes())
    response = client.text_detection(image=image)
    return response.text_annotations[0].description if response.text_annotations else None

def parse_answers(text):
    answers = {}
    current_question = None
    lines = text.split('\n')
    for line in lines:
        # Check if line starts with a numeric value followed by a period
        if line.strip() and line.strip()[0].isdigit() and '.' in line:
            question_number, answer = line.strip().split('.', 1)
            current_question = int(question_number)
            answers[current_question] = answer.strip()
        elif current_question is not None:
            # If current_question is set, append line to existing answer
            answers[current_question] += ' ' + line.strip()
    return answers

def retrieve_imgid(doc_id, key, collection_name):

    # Access Firestore database
    db = firestore.client()

    # Get a reference to the document
    doc_ref = db.collection(collection_name).document(doc_id)

    # Get the document snapshot
    doc = doc_ref.get()

    # Check if the document exists
    if doc.exists:
        # Get the value corresponding to the key
        value = doc.to_dict().get(key)
        if value is not None:
            print("Value for key '{}' in document '{}' in collection '{}': {}".format(key, doc_id, collection_name, value))
            return value
        else:
            print("Key '{}' not found in document '{}' in collection '{}'.".format(key, doc_id, collection_name))
            #following stmt can be removed
            return value
    else:
        print("Document '{}' not found in collection '{}'.".format(doc_id, collection_name))
        #following stmt can be removed
        return value


def process_text(id, input,collectionName):
    image_id_with_extension=retrieve_imgid(id, input, collectionName)
    image_id = image_id_with_extension.split('.')[0]
    image_data = download_image_from_storage(image_id)
    detected_text = detect_text(image_data)
    parsed_text = parse_answers(detected_text)
    return parsed_text


def main(qnpaper_id,anspaper_id):

    cred = credentials.Certificate('firebase-SA.json')
    firebase_admin.initialize_app(cred,{
        'storageBucket': 'gradeease-57107.appspot.com'
    })


    parsed_questions=process_text(qnpaper_id, "question_paper", "trial")
    parsed_key=process_text(qnpaper_id, "answer_key", "trial")
    parsed_answers=process_text(anspaper_id,"answer_paper", "anspapertrial")
    print("*******Text Recognised...**********")
    return parsed_questions, parsed_key, parsed_answers