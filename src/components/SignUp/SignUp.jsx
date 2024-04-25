// SignUp.jsx
import './SignUp.css'; // Import SignUp styles if needed
import React from 'react';
import user_icon from '../../assets/person.png'
import email_icon from '../../assets/email.png'
import password_icon from '../../assets/password.png'
import profession_icon from '../../assets/profession.png'
import Institution_icon from '../../assets/institution.png'

//backend imports
import { auth, db } from '../../firebase-config';
import {createUserWithEmailAndPassword} from 'firebase/auth'
import {setDoc, doc} from 'firebase/firestore'
import {useState} from 'react'
import { useNavigate } from 'react-router-dom';

const SignUp = () => {

  const [name, setName] = useState("")
  const [regEmail, setRegEmail] = useState("")
  const [regPassword, setRegPassword] = useState("")
  const [profession, setProfession] = useState("")
  const [institution, setInstitution] = useState("")
  const [errorMsg, setErrorMsg] = useState("")
  const nav = useNavigate()

  const register = async (e) => {
    e.preventDefault()
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, regEmail, regPassword);
      const regUser = userCredential.user; 
      console.log(regUser)    
      
      if (userCredential && regUser) {
        const userNew = doc(db, 'Users',  regUser.uid); 
        await setDoc(userNew, {
          Name:name, 
          Email:regEmail,
          Institution:  institution,
          Profession: profession
        })
        
        localStorage.setItem('userId', regUser.uid);          
        console.log(localStorage.getItem('userId'))
        nav('/profile')
        //window.location.href = '/UploadPage'; // Redirect to another page after successful registration
    }
    } catch (error) {
      setErrorMsg(error.message);
    }
  };
  
  return (
    <div className='container'>
      <div className='header'>
        <div className='text'>Sign Up</div>
        <div className='underline'></div>
      </div>

      <div className="inputs">
        <div className='input'>
        <img src={user_icon} alt="" />
          <input type="text" placeholder='UserName'
          onChange={(e) => {setName(e.target.value)}} />
        </div>

        <div className='input'>
        <img src={email_icon} alt="" />
          <input type="email" placeholder='Email Id'
          onChange={(e) => {setRegEmail(e.target.value)}} />
        </div>

        <div className='input'>
        <img src={password_icon} alt="" />
          <input type="password" placeholder='Password'
          onChange={(e) => {
            setRegPassword(e.target.value);
          }} />
        </div>

        <div className='input'>
        <img src={profession_icon} alt="" />
          <input type="Profession" placeholder='Profession'
          onChange={(e) => {
            setProfession(e.target.value);
          }} />
        </div>

        <div className='input'>
        <img src={Institution_icon } alt="" />
          <input type="Institution " placeholder='Institution'
          onChange={(e) => {
            setInstitution(e.target.value);
          }} />
        </div>

      </div>

      <div className='submit-container'>
        <div className='submit' onClick={register}>Sign Up</div>
        {errorMsg && <div>{errorMsg}</div>}
      </div>
    </div>

  );
}

export default SignUp;
