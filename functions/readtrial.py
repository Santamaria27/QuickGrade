import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from google.cloud.firestore_v1.base_query import FieldFilter, Or
'''
cred = credentials.Certificate('firebase-SA.json')
firebase_admin.initialize_app(cred)
'''
db=firestore.client()
print('main side readtrial')

def get_all_docs(collectionName):
    docs = (
        db.collection(collectionName).stream()
    )
    print(collectionName)
    print(docs)


    documents_list=[]
    for doc in docs:
        print("inside loop")
        doc_data=doc.to_dict()
        doc_data['id'] = doc.id
        doc_data['doc_data']=doc._data
        documents_list.append(doc_data)

    for doc_data in documents_list:
        print(f"Document ID: {doc_data['id']}")
        print(f"Document Data: {doc_data['doc_data']}")
        print()

#get_all_docs("trial1")