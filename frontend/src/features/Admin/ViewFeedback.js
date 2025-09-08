import React, { useEffect, useState } from "react";
import "../../styles/ViewFeedback.css";

function ViewFeedback() {
  const [feedbackData, setFeedbackData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [feedbackRes, usersRes] = await Promise.all([
          fetch("http://localhost:5500/feedback").then((res) => res.json()),
        ]);

        console.log(feedbackRes);

        setFeedbackData(feedbackRes.reverse());
      } catch (err) {
        alert("Failed to fetch feedback data");
        console.error("Error:", err);
      }
    };

    fetchData();
  }, []);

  const categories = [...new Set(feedbackData.map((f) => f.category))].sort();

  const filteredData =
    selectedCategory === "All"
      ? feedbackData
      : feedbackData.filter((item) => item.category === selectedCategory);

  return (
    <div className="view-container">
      <h1 className="view-title">View Feedback</h1>

      <div className="filter-buttons">
          <button
            key="All"
            className={`filter-btn all`}
            onClick={() => setSelectedCategory("All")}
            type="button"
          >
            All
          </button>
        {categories.map((cat) => ( 
        
          <button
            key={cat}
            className={`filter-btn ${cat.toLowerCase()}`}
            onClick={() => setSelectedCategory(cat)}
            type="button"
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="feedback-table-container">
        <table className="feedback-table">
          <thead>
            <tr>
              <th>Sr. No</th>
              <th>Category</th>
              <th>Feedback</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.category}</td>
                  <td>{item.feedback}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="no-data">
                  No feedback available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewFeedback;
