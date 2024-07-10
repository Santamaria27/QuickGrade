import React from 'react';
import './Scorecard.css'

function Scorecard ({score, list, max}) {
  if (!Array.isArray(list)) {
    return <div className='Card'>Invalid list data</div>;
  }

  return (
    <div className='Card'>
      <h1>TOTAL SCORE</h1>
      <div className="score-info">
        <div className="mark-container">
          <p>Maximum Mark : {max}</p>
        </div>
        <div className="mark-container">
          <p>Obtained Mark : {score}</p>
        </div>
      </div>

      <div className="question-info">
        <p>Question Number:</p>
        <p>Max. Marks:</p>
        <p>Obtained Marks:</p>
      </div>
      {list.map((qns, index) => (
        <div className="answer-info">
        <p>{qns.Ques_Num}</p>
        <p>{qns.Max_Marks}</p>
        <p>{qns.Obt_Marks}</p>
      </div>
      ))}
      
    </div>
  );
};

export default Scorecard;