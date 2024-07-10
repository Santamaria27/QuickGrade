import openai
import re
from firebase_admin import firestore
from read_from_db import main as readFromDb

# qnpaper_id='5'
# anspaper_id='ans002'
# doc_list=readFromDb(qnpaper_id,anspaper_id)

# API_KEY = open("openAPI", "r").read().strip()
# client = openai.OpenAI(api_key=API_KEY)

def extract_numbers(text):
    # Use regular expression to find all numeric parts
    numbers = re.findall(r'\d+', text)
    # Convert the list of strings to integers
    numbers = [int(num) for num in numbers]
    return numbers

def update_documents(collection_name, qnpaper_id, anspaper_id, update_data, qn_no, db):
    # Get a reference to the documents that match the query criteria
    docs_ref = db.collection(collection_name).where("qnpaper_id", "==", qnpaper_id).where("anspaper_id", "==", anspaper_id).where("question_no", "==", qn_no).stream()
    
    # Iterate over the documents and update each one
    for doc in docs_ref:
        doc_ref = db.collection(collection_name).document(doc.id)
        doc_ref.update(update_data)

def main(qnpaper_id,anspaper_id):
    # qnpaper_id='5'
    # anspaper_id='ans002'

    doc_list=readFromDb(qnpaper_id,anspaper_id)

    API_KEY = open("openAPI", "r").read().strip()
    client = openai.OpenAI(api_key=API_KEY)

    response = client.chat.completions.create(model = "gpt-3.5-turbo",
    messages = [{"role": "user","content":"Ignore all previous instructions. Assume you are a high school teacher who is going to grade the exam answer papers of your students. Problem=Analyze each answer with respect to the answer key, the question given and maximum marks. You have to grade the answers based on two factors: 1. Whether the content of the answer is aligned with what the question has asked and the keywords given in the answer key, 2. Whether the answer contains enough number of valid points corresponding to the maximum marks. Example, if the question is to 'write about the 3 types of rocks' for 6 marks, the student has to describe each of the three types of rocks with a minimum of 2 valid points. Another example, if the question is to 'differentiate between system software and application software for 3 marks, the student has to give a minimum of 3 valid points for each type of software in order to be awarded full marks. The output should only contain the marks awarded to that specific answer. Can you acknowledge that you have read my problem by saying READ and don't say anything else yet."}])

    content = response.choices[0].message.content

    print(content)

    for doc_data in doc_list:
        data=doc_data['doc_data']
        qn=data['question']
        qn_no=data['question_no']   
        ans_key=data['answer_key']   
        ans=data['student_answer']
        print(ans)
        max_marks=data['max_marks']
        

        response = client.chat.completions.create(model = "gpt-3.5-turbo",
        messages = [{"role": "user","content":f"Question= {qn},Student answer={ans},Answer key={ans_key},Maximum marks={max_marks}, How much marks will you give for this answer considering the question, the answer key and the maximun marks?Give full marks only if number of valid points equals the maximum marks. Otherwise reduce marks accordingly. Mention the score in number."}],
    temperature=0.2,
    max_tokens=100)

        content = response.choices[0].message.content
        print(content)
        marks = extract_numbers(content)
        obtained_marks=marks[0]
        update_data={'obtained_marks':str(obtained_marks)} 
        print(update_data)
        # Write data to Firestore with the specified document ID
        db=firestore.client()
        #MENTION THE CORRECT COLLECTION NAME
        update_documents('gradingtrial', qnpaper_id, anspaper_id, update_data, qn_no,db)



if __name__ == "__main__":
    main()

