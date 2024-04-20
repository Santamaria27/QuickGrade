import React from 'react'
import './Hero.css'
import dark_arrow from '../../assets/darkarrow.png'

const Hero = ({ onSignUpClick }) => {
  return (
    <div className='hero container'>
    <div className='hero-text'>
        <h1>"We Ensure Effortless Evaluation, Instant Results"</h1>
        <p>"QuickGrade simplifies grading processes, offering educators a seamless experience with its intuitive interface and rapid evaluation capabilities. Say goodbye to tedious grading tasks and hello to efficiency!"</p>
        <button className='btn' onClick={onSignUpClick}>Sign Up <img src={dark_arrow} alt=''/></button>
    </div>
    </div>
  )
}

export default Hero