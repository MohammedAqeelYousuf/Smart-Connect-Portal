import React, { useState } from "react";
import "../../styles/FeedbackForm.css";

const FeedbackForm = () => {
  const [category, setCategory] = useState("");
  const [feedback, setFeedback] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5500/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category: category,
          feedback: feedback
        }),
      });

      if (response.ok) {
        alert("Feedback submitted!");
        setCategory("");
        setFeedback("");
      } else {
        throw new Error("Failed to submit feedback");
      }
    } catch (error) {
      alert("Error submitting feedback");
      console.error("Error:", error);
    }
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
            minLength={10}
            maxLength={50}
          ></textarea>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;
