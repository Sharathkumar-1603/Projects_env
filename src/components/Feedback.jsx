import React, { useState } from "react";

const Feedback = () => {
  const [feedback, setFeedback] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Feedback submitted: ", feedback);
  };

  return (
    <div>
      <h1>Feedback</h1>
      <form onSubmit={handleSubmit}>
        <textarea 
          value={feedback} 
          onChange={(e) => setFeedback(e.target.value)} 
          placeholder="Write your feedback here"
        ></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Feedback;
