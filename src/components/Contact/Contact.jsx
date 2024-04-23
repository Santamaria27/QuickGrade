import React from 'react'
import './Contact.css'
import msg_icon from '../../assets/msg.png'
import mail_icon from '../../assets/mail.png'
import phone_icon from '../../assets/phone.png'
import location_icon from '../../assets/loc.png'

const Contact = () => {
  return (
    <div className='contact' >
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
        <form>
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
  )
}

export default Contact
