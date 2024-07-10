from firebase_admin import firestore
from textrecog import main as textrec

def convert_to_dict_qn(questions,answerkey,answers, qnpaper_id, anspaper_id):
    
    db=firestore.client()
    # Iterate over each question
    for key, value in questions.items():
        formatted_set = {}
        question, marks = value.rsplit('(', 1)
        # Remove ' marks)' from the marks part to get only the numeric value
        marks = marks.replace(' marks)', '')
        # Create the dictionary
        formatted_set["qnpaper_id"] = qnpaper_id
        formatted_set["anspaper_id"] = anspaper_id
        formatted_set["question_no"] = key
        formatted_set["question"] = question
        formatted_set["max_marks"] = marks   

        formatted_set["answer_key"] = answerkey[key]

        formatted_set["student_answer"] = answers[key]

        # #for testing
        # print("printing formatted set one by one")
        # print("formatted_set: ", formatted_set)

        #MENTION THE CORRECT COLLECTION NAME
        doc_ref = db.collection("gradingtrial").document()
        doc_ref.set(formatted_set)
        

def main(qnpaper_id, anspaper_id):

    parsed_questions,parsed_key,parsed_answers = textrec(qnpaper_id,anspaper_id)
    convert_to_dict_qn(parsed_questions,parsed_key,parsed_answers, qnpaper_id, anspaper_id)
    print("Written to DB..")
   

# if __name__ == "__main__":
#     main()
