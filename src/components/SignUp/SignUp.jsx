// SignUp.jsx
import React from 'react';
import './SignUp.css'; // Import SignUp styles if needed
import user_icon from '../../assets/person.png'
import email_icon from '../../assets/email.png'
import password_icon from '../../assets/password.png'
import Institution_icon from '../../assets/institution.png'
import Location_icon from '../../assets/location.png'

const SignUp = () => {
  return (
    <div className='container'>
      <div className='header'>
        <div className='text'>Sign Up</div>
        <div className='underline'></div>
      </div>

      <div className="inputs">
        <div className='input'>
        <img src={user_icon} alt="" />
          <input type="text" placeholder='UserName' />
        </div>

        <div className='input'>
        <img src={email_icon} alt="" />
          <input type="email" placeholder='Email Id' />
        </div>

        <div className='input'>
        <img src={password_icon} alt="" />
          <input type="password" placeholder='Password' />
        </div>

        <div className='input'>
        <img src={Institution_icon } alt="" />
          <input type="Institution " placeholder='Institution'/>
        </div>

        <div className='input'>
        <img src={Location_icon} alt="" />
          <input type="Location " placeholder='Location'/>
        </div>
      </div>

      <div className='submit-container'>
        <div className='submit'>Sign Up</div>
      </div>
    </div>
  );
}

export default SignUp;
