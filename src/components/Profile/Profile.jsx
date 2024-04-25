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

  const submitFiles = async () => {
    try {
      // Upload files to Firestore
      const uploadFile = async (file) => {
        console.log(file[0].name);
        const storageRef = ref(storage, `uploads/${file[0].name}`);
        
        const metadata = { contentType: file[0].type };   
        console.log(`metadata: ${metadata}`)      
        const snapshot = await uploadBytes(storageRef, file[0]);

        console.log('Upload successful:', file[0].name);
        const downloadURL = await getDownloadURL(snapshot.ref);
        console.log(`url: ${downloadURL}`);

        const newRef = ref(`uploads/${file[0].name}`)
        const downloadURL2 = await getDownloadURL(newRef.ref);
        console.log (`url using name: ${{downloadURL2}}`);

        return downloadURL;  

      };

      const [questionPaperUrl, answerKeyUrl, answerPaperUrl] = await Promise.all([
        uploadFile(questionPaper),
        uploadFile(answerKey),
        uploadFile(answerPaper)
      ]);
  
      // Get user ID from local storage
      const userId = localStorage.getItem('userId');
  
      // Insert data into Firestore
      const questionPaperRef = await addDoc(collection(db, 'questionPapers'), {
        userId,
        questionPaperUrl,
        answerKeyUrl
      });
  
      const questionId = questionPaperRef.id;
  
      const answerPaperData = {
        userId,
        questionId,
        answerPaperUrl
      };

      await addDoc(collection(db, 'answerPapers'), answerPaperData); 
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

/*https://firebasestorage.googleapis.com/v0/b/gradeease-57107.appspot.com/o/uploads%2Fhis_pc.jpg?alt=media&token=b5df8288-b2da-4d9a-95a1-65c854b2b3fd */
/*https://firebasestorage.googleapis.com/v0/b/gradeease-57107.appspot.com/o/uploads%2FIMG-20240418-WA0008.jpg?alt=media&token=cab211e1-f0ae-41b0-8287-2800ecb224be */