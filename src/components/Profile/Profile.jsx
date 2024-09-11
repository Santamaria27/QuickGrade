import React, { useState, useEffect } from 'react';
import { auth, db, storage  } from '../../firebase-config';
import { doc, getDoc, collection, addDoc ,getDocs,query,where } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import Scorecard from '../ScoreCard/Scorecard'

//new imports
import { ref, uploadBytes,listAll ,getDownloadURL } from 'firebase/storage';
import Modal from '../Modal/Modal';

function Profile() {
  const [questionPaper, setQuestionPaper] = useState([]);
  const [answerKey, setAnswerKey] = useState([]);
  const [answerPaper, setAnswerPaper] = useState([]);
  const [qnid, setqID] = useState("");
  const [anid, setaID]= useState("");
  //added new
  const [showScore,setShowscore]=useState(false);

  const toggleScore=()=>{
    setShowscore(!showScore);
  }

  const handleDrop = (e, targetArea, method) => {
    e.preventDefault()
    let file = []
    if (method === 'drop'){
      file = e.dataTransfer.files[0];
    }  else {
      file = e.target.files[0];
    }

    if (targetArea === 'questionPaper') {
      setQuestionPaper([file]);
    } else if (targetArea === 'answerKey') {
      setAnswerKey([file]);
    } else if (targetArea === 'answerPaper') {
      setAnswerPaper([file]);
    }
  };

  const allowDrop = (e) => {
    e.preventDefault();
  };

  const handleButtonClick = (targetArea) => {
    document.getElementById(`${targetArea}-file-input`).click();   
  };

  //backend
  const [name, setName] = useState('');
  const [profession, setProfession] = useState('');
  const [institution, setInstitution] = useState('');
  const [email, setEmail] = useState('');
  const nav = useNavigate();
  const loggedUserId = localStorage.getItem('userId');
  //scorenew
  const [total, setTotal] = useState()
  const [max, setMax] = useState()
  const [markPerQn, setMarkPerQ] = useState([])

  

  useEffect(() => {
    const fetchUserData = async () => {
      const userDocRef = doc(db, 'Users', loggedUserId);

      try {
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          setName(userDocSnap.data().Name);
          setEmail(userDocSnap.data().Email);
          setProfession(userDocSnap.data().Profession);
          setInstitution(userDocSnap.data().Institution);
        }
      } catch (error) {
        console.error('Error fetching user document:', error);
      }
    };
    fetchUserData();
  }, []);

  const logout = async () => {
    await signOut(auth);
    nav('/');
  };

  const submitFiles = async () => {
    try {
      // Upload files to Firestore
      const uploadFile = async (file) => {
        console.log(file[0].name);
        const storageRef = ref(storage, `trial/${file[0].name}`);    //changed uploads to trial   
        const metadata = { contentType: file[0].type };   
        console.log(`metadata: ${metadata}`)      
        await uploadBytes(storageRef, file[0]);

        console.log('Upload successful:', file[0].name);
        return file[0].name;  

      };
      
      //Promise.all returns success when all the async functions in the array is successful. the functions run parallely. if one of them fails, it returns error
      const [questionPaperUrl, answerKeyUrl, answerPaperUrl] = await Promise.all([
        uploadFile(questionPaper),
        uploadFile(answerKey),
        uploadFile(answerPaper)
      ]);
    
      // Insert data into Firestore
      const questionPaperRef = await addDoc(collection(db, 'QnAndKeys'), {
        "User_id" : loggedUserId,
        "question_paper" : questionPaperUrl,        //changed qn_paper to question_paper
        "answer_key" : answerKeyUrl,                //changed ans_key to answer_key
      });
      
      const quesid=questionPaperRef.id
      setqID(quesid);

      const answerPaperData = {
        "User_id" : loggedUserId,
        "Qn_id" : quesid,
        "answer_paper" :answerPaperUrl            //changed Paper to answer_paper
      };

      //await addDoc(collection(db, 'AnsPapers'), answerPaperData); 
      const answerPaperRef = await addDoc(collection(db, 'AnsPapers'), answerPaperData);
      setaID(answerPaperRef.id)

      alert('Files submitted successfully!');
      
    } catch (error) {
      console.error('Error submitting files:', error);
      alert('An error occurred while submitting files.');
    }
  };


  const apifetch = async (param1,param2) => {
    try {
      const response = await fetch(`http://localhost:8000/read_firebase_data?param1=${param1}&param2=${param2}`);
      
      if (response.ok) {
        const data = await response.json();
        console.log('Firebase data:', data);
        // Process the retrieved data as needed

        
      } else {
        //alert("Grading successfull! Select 'Show Score' to view marks.")
        console.error('Error fetching Firebase data:', response.statusText);
      }
    } catch (error) {
      alert("Grading successfull! Select 'Show Score' to view marks.")
      console.error('Error fetching Firebase data:', error);
    }
  }; 

  useEffect(() => {
    console.log("total marks: ", total);
  }, [total]);
  
  useEffect(() => {
    console.log("Marks per question", markPerQn);
  }, [markPerQn]);
  
  const displayScore = async() => {
    let marks, maxMarkperQ,  qnNo;
    let totalMarks = 0, totalMaxMarks = 0
    const gradedQnsRef = collection(db, 'gradingtrial'); //correct graded collection name
    let marklist = []
    // Iterate over each  document
    const gradeQuery = query(gradedQnsRef, where('anspaper_id', '==', anid)); //filter required ones
    const gradedDocsSnapshot = await getDocs(gradeQuery); //get the data of required ones

    gradedDocsSnapshot.forEach((docs) => {
      marks = parseInt(docs.data().obtained_marks, 10);
      maxMarkperQ = parseInt(docs.data().max_marks, 10);
      qnNo = docs.data().question_no
      totalMaxMarks  += maxMarkperQ;
      totalMarks += marks
      marklist = [...marklist, { "Ques_Num": qnNo, "Obt_Marks": marks, "Max_Marks" : maxMarkperQ }];
    });
    
    setMarkPerQ(marklist);    
    setTotal(totalMarks);
    setMax(totalMaxMarks);
    setShowscore(true);
  }
    

  return (
    <div className="App">
        
      <h1>Welcome to QuickGrade {name}! Let's get started</h1>
      <div className="contain">
          <h2>Question Paper</h2>
          <div className="box" onDrop={(e) => handleDrop(e, 'questionPaper', 'drop')} onDragOver={allowDrop}>
            <p>Drag and Drop Here</p>
            {questionPaper.length > 0 && <img src={URL.createObjectURL(questionPaper[0])} alt="Question Paper" />}
            <button onClick={() => handleButtonClick('questionPaper')}>Upload a Media Image</button>
            <input
              id="questionPaper-file-input"
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={(e) => handleDrop(e, 'questionPaper', 'change')}
            />
          </div>

        <h2>Answer Key</h2>
        <div className="box" onDrop={(e) => handleDrop(e, 'answerKey', 'drop')} onDragOver={allowDrop}>
          <p>Drag and Drop Here</p>
          {answerKey.length > 0 && <img src={URL.createObjectURL(answerKey[0])} alt="Answer Key" />}
          <button onClick={() => handleButtonClick('answerKey')}>Upload a Media Image</button>
          <input
            id="answerKey-file-input"
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={(e) => handleDrop(e, 'answerKey', 'change')}
          />
        </div>
        
        <h2>Answer Paper</h2>
        <div className="box" onDrop={(e) => handleDrop(e, 'answerPaper', 'drop')} onDragOver={allowDrop}>
          <p>Drag and Drop Here</p>
          {answerPaper.length > 0 && <img src={URL.createObjectURL(answerPaper[0])} alt="Answer Paper" />}
          <button onClick={() => handleButtonClick('answerPaper')}>Upload a Media Image</button>
          <input
            id="answerPaper-file-input"
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={(e) => handleDrop(e, 'answerPaper', 'change')}
          />
        </div>
        <div className='submit-container'>
          <div className='submit' onClick={submitFiles}>Submit</div>
          <button className='submit' onClick={() => apifetch(qnid, anid)}>Grade</button>
          <button className='submit' onClick={displayScore}>Show Score</button>
          {
           showScore?
           (
            <Modal show={showScore} onClose={toggleScore}>
              <Scorecard score={total} list={markPerQn} max={max}/>
            </Modal>
           ):null
        }
        </div>
        
      </div>
      <div className='submit-container'>
        <div className='submit' onClick={logout}>Sign Out</div>
      </div>
    </div>
  );
}

export default Profile;

