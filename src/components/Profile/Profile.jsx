import React, { useState, useEffect } from 'react';
import { auth, db, storage  } from '../../firebase-config';
import { doc, getDoc, collection, addDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

//new imports
import { ref, uploadBytes,listAll ,getDownloadURL } from 'firebase/storage';

function Profile() {
  const [questionPaper, setQuestionPaper] = useState([]);
  const [answerKey, setAnswerKey] = useState([]);
  const [answerPaper, setAnswerPaper] = useState([]);
  const [qnid, setID] = useState("")

  const handleDrop = (e, targetArea, method) => {
    e.preventDefault()
    let file = []
    if (method === 'drop'){
      file = e.dataTransfer.files[0];
    }  else {
      file = e.target.files[0];
    }

    if (targetArea === 'questionpaper') {
      setQuestionPaper([file]);
    } else if (targetArea === 'answerkey') {
      setAnswerKey([file]);
    } else if (targetArea === 'answerpaper') {
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
        const storageRef = ref(storage, `uploads/${file[0].name}`);       
        const metadata = { contentType: file[0].type };   
        console.log(`metadata: ${metadata}`)      
        await uploadBytes(storageRef, file[0]);

        console.log('Upload successful:', file[0].name);
        return file[0].name;  

      };

      const [questionPaperUrl, answerKeyUrl, answerPaperUrl] = await Promise.all([
        uploadFile(questionPaper),
        uploadFile(answerKey),
        uploadFile(answerPaper)
      ]);
    
      // Insert data into Firestore
      const questionPaperRef = await addDoc(collection(db, 'QnAndKeys'), {
        "User_id" : loggedUserId,
        "qn_paper" : questionPaperUrl,
        "ans_key" : answerKeyUrl,
      });
  
      setID(questionPaperRef.id);

      const answerPaperData = {
        "User_id" : loggedUserId,
        "Qn_id" : questionId,
        "Paper" :answerPaperUrl
      };

      await addDoc(collection(db, 'AnsPapers'), answerPaperData); 
      alert('Files submitted successfully!');
      
    } catch (error) {
      console.error('Error submitting files:', error);
      alert('An error occurred while submitting files.');
    }
  };

  return (
    <div className="App">
        
      <h1>Welcome to QuickGrade {name} Teacher... Let's get started</h1>
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
        </div>
        
      </div>
      <div className='submit-container'>
        <div className='submit' onClick={logout}>Sign Out</div>
      </div>
    </div>
  );
}

export default Profile;

