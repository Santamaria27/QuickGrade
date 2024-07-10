from firebase_admin import firestore
from write_to_db import main as write2db

# cred = credentials.Certificate('firebase-SA.json')
# firebase_admin.initialize_app(cred)

def get_all_docs(collectionName,qnpaper_id, anspaper_id):
    db=firestore.client()
    docs = (
        db.collection(collectionName)
        .where("qnpaper_id", "==", qnpaper_id)
        .where("anspaper_id", "==", anspaper_id)
        .stream()
    )

    documents_list=[]
    for doc in docs:
        doc_data=doc.to_dict()
        doc_data['id'] = doc.id
        doc_data['doc_data']=doc._data
        documents_list.append(doc_data)
    return documents_list

def main(qnpaper_id,anspaper_id):

    write2db(qnpaper_id,anspaper_id)
    
    #MENTION THE CORRECT COLLECTION NAME
    doc_list=get_all_docs("gradingtrial",qnpaper_id,anspaper_id)
    print("Data read from DB")
    return doc_list