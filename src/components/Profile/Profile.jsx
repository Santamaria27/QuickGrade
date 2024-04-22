import React, { useState, useEffect } from 'react';
import { auth, db } from '../../firebase-config';
import { doc, getDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

function Profile() {
  const [questionPaper, setQuestionPaper] = useState([]);
  const [answerKey, setAnswerKey] = useState([]);
  const [answerPaper, setAnswerPaper] = useState([]);

  const handleDrop = (e, targetArea) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];

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

  const handleFileChange = (e, targetArea) => {
    const file = e.target.files[0];
    if (targetArea === 'questionPaper') {
      setQuestionPaper([file]);
    } else if (targetArea === 'answerKey') {
      setAnswerKey([file]);
    } else if (targetArea === 'answerPaper') {
      setAnswerPaper([file]);
    }
  };

  //backend
  const [name, setName] = useState('');
  const [profession, setProfession] = useState('');
  const [institution, setInstitution] = useState('');
  const [email, setEmail] = useState('');
  const nav = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const loggedUserId = localStorage.getItem('userId');
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

  return (
    <div className="App">
        
      <h1>Welcome to QuickGrade {name} Teacher... Let's get started</h1>
      <div className="container">
      <h2>Question Paper</h2>
        <div className="box" onDrop={(e) => handleDrop(e, 'questionPaper')} onDragOver={allowDrop}>
          <p>Drag and Drop Here</p>
          {questionPaper.length > 0 && <img src={URL.createObjectURL(questionPaper[0])} alt="Question Paper" />}
          <button onClick={() => handleButtonClick('questionPaper')}>Upload a Media Image</button>
          <input
            id="questionPaper-file-input"
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={(e) => handleFileChange(e, 'questionPaper')}
          />
        </div>

        <h2>Answer Key</h2>
        <div className="box" onDrop={(e) => handleDrop(e, 'answerKey')} onDragOver={allowDrop}>
          <p>Drag and Drop Here</p>
          {answerKey.length > 0 && <img src={URL.createObjectURL(answerKey[0])} alt="Answer Key" />}
          <button onClick={() => handleButtonClick('answerKey')}>Upload a Media Image</button>
          <input
            id="answerKey-file-input"
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={(e) => handleFileChange(e, 'answerKey')}
          />
        </div>
        
        <h2>Answer Paper</h2>
        <div className="box" onDrop={(e) => handleDrop(e, 'answerPaper')} onDragOver={allowDrop}>
          <p>Drag and Drop Here</p>
          {answerPaper.length > 0 && <img src={URL.createObjectURL(answerPaper[0])} alt="Answer Paper" />}
          <button onClick={() => handleButtonClick('answerPaper')}>Upload a Media Image</button>
          <input
            id="answerPaper-file-input"
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={(e) => handleFileChange(e, 'answerPaper')}
          />
        </div>
      </div>
      <div className='submit-container'>
        <div className='submit' onClick={logout}>Sign Out</div>
      </div>
    </div>
  );
}

export default Profile;