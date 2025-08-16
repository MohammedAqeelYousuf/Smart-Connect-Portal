import React, { useState } from "react";
import "../styles/FeedbackForm.css";

const FeedbackForm = () => {
  const [category, setCategory] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Category:", category);
    console.log("Feedback:", feedback);
    alert("Feedback submitted successfully!");
    setCategory("");
    setFeedback("");
  };

  return (
    <div className="feedback-container">
      <div className="left-panel">
        <p>
          Help us improve by <br />
          sharing your experience <br />
          and suggestions.
        </p>
      </div>

      <div className="right-panel">
        <h2>Submit Your Feedback</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            <option value="Academic">Academic</option>
            <option value="Administration">Administration</option>
            <option value="Extracurricular">Extracurricular</option>
            <option value="Facilities">Facilities</option>
            <option value="Other">Other</option>
          </select>

          <label htmlFor="feedback">Feedback:</label>
          <textarea
            id="feedback"
            placeholder="Write your feedback here"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            required
          ></textarea>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;
