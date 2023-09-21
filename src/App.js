import React, { useState } from "react";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";
import "./App.css";

function App() {
  const [questions, setQuestions] = useState([]);
  const [courseTitle, setCourseTitle] = useState("");
  const [assessmentType, setAssessmentType] = useState("");
  const [showQuestionList, setShowQuestionList] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  // const [selectedExamCA, setSelectedExamCA] = useState(false);

  const addQuestion = (newQuestion) => {
    setQuestions([...questions, newQuestion]);
    showAlertPopup("Question added successfully!");
  };

  const warningAlert = (message) => {
    showAlertPopup(message);
  }

  const handleOnAssesmentClick = (e) => {
    let assType = e.target.value
    // if(assType === "exam_ca"){
    //   setSelectedExamCA(!selectedExamCA)
    // }
    // else if(assType !== "exam_ca" && selectedExamCA){
    //   setSelectedExamCA(!selectedExamCA)
    // }

    setAssessmentType(assType)
  }

  const deleteQuestion = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    showAlertPopup("Question deleted!");
    setQuestions(updatedQuestions);
  };

  const compileQuestionsToTXT = () => {
    // Check if the course title meets the minimum length requirement
    if (courseTitle.length < 3) {
      showAlertPopup("Course title must be at least 3 letters long.");
      return;
    }

    const imageFolder = `images_${courseTitle}_${assessmentType}`;
    const imageFolderPath = `${imageFolder}/`;
    const imageHtmlTags = [];

    // Determine the assessment type and format accordingly
    let txtContent = "";

    if (assessmentType === "exam_ca") {
      const examQuestions = questions.slice(0, (questions.length * 60) / 100);
      const caQuestions = questions.slice(examQuestions.length);

      const formattedExamQuestions = examQuestions.map((question, index) => {
        const formattedOptions = question.options
          .map((option, optionIndex) => {
            const optionPrefix =
              optionIndex === question.correctAnswer ? "Answer" : "Option";
            return `${optionPrefix}: ${option}`;
          })
          .join("\n");
        return `Question:\nContent: ${question.text}\n${formattedOptions}\n`;
      });

      const formattedCAQuestions = caQuestions.map((question, index) => {
        const formattedOptions = question.options
          .map((option, optionIndex) => {
            const optionPrefix =
              optionIndex === question.correctAnswer ? "Answer" : "Option";
            return `${optionPrefix}: ${option}`;
          })
          .join("\n");
        return `Question:\nContent: ${question.text}\n${formattedOptions}\n`;
      });

      // txtContent = `course: ${courseTitle}_${assessmentType}\n\nExam Questions:\n\n${formattedExamQuestions.join(
      //   "\n"
      // )}\nCA Questions:\n\n${formattedCAQuestions.join("\n")}`;

      txtContent = `course: ${courseTitle}_CA\n\n${formattedCAQuestions.join(
        "\n"
      )}\ncourse: ${courseTitle}_Exam\n\n${formattedExamQuestions.join("\n")}`;


    } else {
      const formattedQuestions = questions.map((question, index) => {
        const formattedOptions = question.options
          .map((option, optionIndex) => {
            const optionPrefix =
              optionIndex === question.correctAnswer ? "Answer" : "Option";
            return `${optionPrefix}: ${option}`;
          })
          .join("\n");
        return `Question:\nContent: ${question.text}\n${formattedOptions}\n`;
      });

      txtContent = `course: ${courseTitle}_${assessmentType}\n\n${formattedQuestions.join(
        "\n"
      )}`;
    }

    // Create a Blob containing the text data.
    const blob = new Blob([txtContent], { type: "text/plain" });

    // Create a download link and trigger a click event to download the file.
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "questions.txt";
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    showAlertPopup("Questions compiled successfully!");
  };

  const clearQuestions = () => {
    setQuestions([]);
    showAlertPopup("Questions cleared successfully!");
  };

  const showAlertPopup = (message) => {
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000); // Hide the alert after 3 seconds
  };

  const toggleQuestionList = () => {
    setShowQuestionList(!showQuestionList);
  };

  return (
    <div className="App">
      <h1>Exam Question Editor</h1>
      <div>
        <label>Course Title:</label>
        <input
          type="text"
          value={courseTitle}
          onChange={(e) => setCourseTitle(e.target.value)}
        />
        <label>Assessment Type:</label>
        <select
          className="select-field"
          value={assessmentType}
          onChange={handleOnAssesmentClick}
        >
          <option value="examination">Examination</option>
          <option value="assessment">Continuous Assessment</option>
          <option value="exam_ca">Exam Continuous Assessment</option>
        </select>
      </div>
      {/* {selectedExamCA && 
      <div>
        <label>
          CA : 
          <input type="text" />
        </label>

        <label>
          Exam : 
          <input type="text" />
        </label>
      </div>
      } */}
      <QuestionForm addQuestion={addQuestion} warningAlert={warningAlert} />
      <div style={{
        display: 'flex',
        justifyContent: 'space-between'
      }}>
        <button onClick={toggleQuestionList}>
          {showQuestionList ? "Close Question List" : "Show Question List"}
        </button>
        <button onClick={clearQuestions} className="clear-button">
          Clear Questions
        </button>
      </div>
      {showQuestionList && (
        <QuestionList questions={questions} deleteQuestion={deleteQuestion} />
      )}
      <div></div>
      <div style={{
        textAlign: 'center',
        marginTop: '40px'
      }}>
        <button onClick={compileQuestionsToTXT}>Compile Questions to TXT</button>
      </div>
      {/* {showAlert && (
        <div className="alert">
          <p>{alertMessage}</p>
        </div>
      )} */}

      {showAlert && (
        <div className="alert-container">
          <div className="alert">
            <p>{alertMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
