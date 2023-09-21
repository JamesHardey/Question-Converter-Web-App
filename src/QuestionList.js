import React, { useState }  from "react";

function QuestionList({ questions, deleteQuestion }) {
    
  return (
    <div className="QuestionList">
      <h2>Questions</h2>
      <ul>
        {questions.map((question, index) => (
          <li key={index}>
            <p>Question: {index+1}</p>
            <p>{question.text}</p>
            <ul>
              {question.options.map((option, optionIndex) => (
                <li
                  key={optionIndex}
                  className={
                    question.correctAnswers.includes(optionIndex) ? "correct" : ""
                  }
                >
                  {option}
                </li>
              ))}
            </ul>
            <button onClick={() => deleteQuestion(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default QuestionList;
