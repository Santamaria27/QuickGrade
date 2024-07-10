# Welcome to Cloud Functions for Firebase for Python!
# To get started, simply uncomment the below code or create your own.
# Deploy with `firebase deploy`

#from firebase_functions import https_fn
#from firebase_admin import initialize_app

# initialize_app()
#
#
from firebase_functions import firestore_fn, https_fn

# The Firebase Admin SDK to access Cloud Firestore.
#from firebase_admin import initialize_app, firestore
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import google.cloud.firestore
#from openAPI import main as openapimain


#app = initialize_app()
cred = credentials.Certificate('firebase-SA.json')
firebase_admin.initialize_app(cred)
from readtrial import get_all_docs

#Doc code 

@https_fn.on_request()
def addmessage(req: https_fn.Request) -> https_fn.Response:
    print("in adding print")
    original = req.args.get("text")
    if original is None:
        return https_fn.Response("No text parameter provided", status=400)

    # Call the function from openapi.py
    qnpaper_id='5'
    anspaper_id='ans002'
    #openapimain(qnpaper_id,anspaper_id)
    get_all_docs('trial1')
    

    # Send back a message that we've successfully written the message
    return https_fn.Response(f"Done")
    
