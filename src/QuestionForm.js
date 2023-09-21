import React, { useState } from "react";


function QuestionForm({ addQuestion, warningAlert }) {
    const [questionText, setQuestionText] = useState("");
    const [options, setOptions] = useState(["", "", "", ""]);
    const [correctAnswers, setCorrectAnswers] = useState([]);
    const [image, setImage] = useState(null);
    

    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    const handleSubmit = () => {

        if (questionText.trim() === "" || options.some((opt) => opt.trim() === "")) {
            warningAlert("Please fill in all fields.");
            return;
        }

        if (correctAnswers.length === 0) {
            warningAlert("Select at least one correct answer.");
            return;
        }

        const newQuestion = {
            text: questionText,
            options: options,
            correctAnswers: correctAnswers,
        };
        addQuestion(newQuestion);
        setQuestionText("");
        setOptions(["", "", "", ""]);
        setCorrectAnswers([]);
        setImage(null)
    };

    const handleCheckboxChange = (index) => {
        if (correctAnswers.includes(index)) {
            // If the checkbox is already selected, remove it
            const updatedAnswers = correctAnswers.filter((answer) => answer !== index);
            setCorrectAnswers(updatedAnswers);
        } else {
            // If the checkbox is not selected, add it
            setCorrectAnswers([...correctAnswers, index]);
        }
    };

    return (
        <div className="QuestionForm">
            <div>
                <h2>Add Question</h2>

                <textarea
                    placeholder="Enter the question text"
                    value={questionText}
                    onChange={(e) => setQuestionText(e.target.value)}
                    rows={12} // You can adjust the number of rows as needed
                    cols={50} // You can adjust the number of columns as needed
                ></textarea>
            </div>

            <ul>
                {options.map((option, index) => (
                    <li key={index}>
                        <input
                            type="text"
                            placeholder={`Option ${index + 1}`}
                            value={option}
                            onChange={(e) => handleOptionChange(index, e.target.value)}
                        />
                        <label>
                            <input
                                type="checkbox"
                                checked={correctAnswers.includes(index)}
                                onChange={() => handleCheckboxChange(index)}
                            />
                        </label>
                    </li>
                ))}
            </ul>

            {/* <label>Image:</label>
            <input type="file" accept="image/*" onChange={handleImageChange} /> */}

            <div style={{
                textAlign: 'end'
            }}>
                <button onClick={handleSubmit}>Add Question</button>
            </div>

        </div>
    );
}

export default QuestionForm;
