import React from 'react';
import './Aboutus.css';

const Aboutus = () => {
  return (
  <div className='heading'>
    <h1>ABOUT US</h1>
    
    <div className='about'>
      <div className='intro'>
        <h2>About Us:</h2>
        <p>
          "At QuickGrade, we're passionate about revolutionizing the education sector through innovative technology. Our team is dedicated to providing educators with cutting-edge tools that streamline grading processes, saving valuable time and enhancing the overall teaching experience. With a commitment to excellence and user-centric design, we strive to empower educators worldwide to focus more on what truly matters: inspiring and guiding their students towards success."
        </p>
      </div>
      <div className='mission'>
        <h3>Mission:</h3>
        <p>
          "Our mission at QuickGrade is to transform the way educators assess student learning by offering intuitive and efficient grading solutions. We are committed to simplifying grading tasks, saving educators valuable time, and ultimately empowering them to focus more on inspiring and guiding their students towards success."
        </p>
      </div>
      <div className='vision'>
        <h3>Vision:</h3>
        <p>
          "Our vision at QuickGrade is to create a future where grading becomes effortless and efficient, allowing educators to dedicate more time to meaningful interactions with their students. We aim to be the leading provider of cutting-edge grading technology, enabling educators worldwide to deliver personalized and impactful learning experiences. Through our dedication to innovation and excellence, we strive to empower educators to unlock their full potential and shape the future of education."
        </p>
      </div>
    </div>
    </div>
  );
}

export default Aboutus;
