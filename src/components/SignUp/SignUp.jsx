// SignUp.jsx
import './SignUp.css'; // Import SignUp styles if needed
import React from 'react';
import user_icon from '../../assets/person.png'
import email_icon from '../../assets/email.png'
import password_icon from '../../assets/password.png'
import Institution_icon from '../../assets/institution.png'

//backend imports
import { auth, db } from '../../firebase-config';
import {createUserWithEmailAndPassword} from 'firebase/auth'
import {addDoc, collection} from 'firebase/firestore'
import {useState} from 'react'

const SignUp = () => {

  const [name, setName] = useState("")
  const [regEmail, setRegEmail] = useState("")
  const [regPassword, setRegPassword] = useState("")
  const [profession, setProfession] = useState("")
  const [institution, setInstitution] = useState("")
  const [errorMsg, setErrorMsg] = useState("")
  const userCollectionRef = collection(db, "Users") //for diff tables, different collections

  //Adding data to the database
  const createStudent = async() => {
    await addDoc(userCollectionRef, {
      Name:name, 
      Email:regEmail,
      Institution:  institution,
      Profession: profession
    })
  }

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(auth, regEmail, regPassword);
      console.log(user);
      await createStudent()
      alert("Registered successfully");
    } 
    catch (error) {
      setErrorMsg(error.message)
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
        <img alt="" />
          <input type="Profession " placeholder='Profession'
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
