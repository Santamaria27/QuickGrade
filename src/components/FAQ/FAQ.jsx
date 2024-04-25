import React from 'react';
import './FAQ.css';

const FAQ = () => {
  return (
    <div className="faq-container">
      <h2 className="section-heading">FAQ</h2>
      <div className="faq-item">
        <h3 className="question">What is an automated grading system?</h3>
        <p className="answer">An automated grading system is a software solution that allows educators to automatically grade assignments, quizzes, or exams using predefined criteria or algorithms.</p>
      </div>
      <div className="faq-item">
        <h3 className="question">How does an automated grading system work?</h3>
        <p className="answer">Automated grading systems typically analyze student responses based on predetermined rules or machine learning algorithms. They can evaluate factors such as correctness, completeness, and quality of responses to assign grades.</p>
      </div>
      <div className="faq-item">
        <h3 className="question">What are the benefits of using an automated grading system?</h3>
        <p className="answer">Some benefits of automated grading systems include increased efficiency, consistency in grading, faster feedback for students, and the ability to handle large volumes of assessments.</p>
      </div>
      <div className="faq-item">
        <h3 className="question">Are there any limitations to automated grading systems?</h3>
        <p className="answer">While automated grading systems offer many advantages, they may have limitations in evaluating subjective or complex responses that require human judgment. Additionally, they may not be suitable for all types of assessments.</p>
      </div>
    </div>
  );
}

export default FAQ;
