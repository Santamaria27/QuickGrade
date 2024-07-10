/*
import React from 'react'
import './Contact.css'
import msg_icon from '../../assets/msg.png'
import mail_icon from '../../assets/mail.png'
import phone_icon from '../../assets/phone.png'
import location_icon from '../../assets/loc.png'
import axios from 'axios'


const Contact = () => {
  return (
    <div className='contacts'>
      <h2 className="section-heading">CONTACT US</h2>
      <div className='contact'>
        <div className='contact-col'>
        <h3>Send us a message <img src={msg_icon}  alt =''/></h3>
        <p>Feel free to reach out through contact form or find our contact information below. Your feedback, questions, and suggestions are important to us as we strive to provide exceptional service.</p>
        <ul>
            <li><img src={mail_icon} alt="" />Contact@GuickGrade</li>
            <li><img src={phone_icon} alt="" />+1 123-647-5432</li>
            <li><img src={location_icon} alt="" />Model Engineering College<br/>Thrikkakara, Kochi<br/>Kerala, PIN: 682021</li>
        </ul>
        </div>
      <div className='contact-col'>
        <form onSubmit={handleSubmit}>
            <label>Your name</label>
            <input type="text" name="name" placeholder="Enter your name" required />
            <label>Phone Number</label>
            <input type="tel" name='phone' placeholder='Enter your mobile number' required/>
            <label>Write your message here</label>
            <textarea name="message"  rows="6" placeholder='Enter your message'></textarea>
            <button type='submit' className='btn'>Submit now</button>
        </form>
        <span>Sending</span>
      </div>
    </div>
    </div>
  )
}

export default Contact
*/

import React, { useState } from 'react';
import './Contact.css';
import msg_icon from '../../assets/msg.png';
import mail_icon from '../../assets/mail.png';
import phone_icon from '../../assets/phone.png';
import location_icon from '../../assets/loc.png';
import axios from "axios"

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submission for message sending ");
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    localStorage.setItem(`msg ${randomNumber}`, formData.name + formData.phone + formData.message);
    axios.post('https:localhost/3000/api/message', formData)
    .then((response) => {
      console.log('Response:', response.data);
     
    })
    .catch((error) => {
      console.error('Error:', error);
      // Handle error
    });
  };

  return (
    <div className='contacts'>
      <h2 className="section-heading">CONTACT US</h2>
      <div className='contact'>
        <div className='contact-col'>
          <h3>Send us a message <img src={msg_icon} alt='' /></h3>
          <p>Feel free to reach out through contact form or find our contact information below. Your feedback, questions, and suggestions are important to us as we strive to provide exceptional service.</p>
          <ul>
            <li><img src={mail_icon} alt="" />Contact@GuickGrade</li>
            <li><img src={phone_icon} alt="" />+1 123-647-5432</li>
            <li><img src={location_icon} alt="" />Model Engineering College<br />Thrikkakara, Kochi<br />Kerala, PIN: 682021</li>
          </ul>
        </div>
        <div className='contact-col'>
          <form onSubmit={handleSubmit}>
            <label>Your name</label>
            <input type="text" name="name" value={formData.name} placeholder="Enter your name" required onChange={handleChange} />
            <label>Phone Number</label>
            <input type="tel" name='phone' value={formData.phone} placeholder='Enter your mobile number' required onChange={handleChange} />
            <label>Write your message here</label>
            <textarea name="message" rows="6" placeholder='Enter your message' value={formData.message} onChange={handleChange}></textarea>
            <button type='submit' className='btn'>Submit now</button>
          </form>
          
        </div>
      </div>
    </div>
  );
};

export default Contact;
