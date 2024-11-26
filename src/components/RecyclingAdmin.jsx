import React, { useEffect, useState } from "react";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig"; 
import axios from "axios";

const RecyclingAdmin = () => {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "recyclingSubmissions"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSubmissions(data);
    });

    return () => unsubscribe();
  }, []);

  const handleClear = async (id, clientEmail) => {
    try {
    
      await deleteDoc(doc(db, "recyclingSubmissions", id));
      
 
      await sendEmailNotification(clientEmail);

      alert("Submission cleared successfully and client notified!");
    } catch (error) {
      console.error("Error clearing submission:", error);
      alert("Failed to clear. Please try again.");
    }
  };

  const sendEmailNotification = async (clientEmail) => {
    const emailData = {
      service_id: "your_service_id",
      template_id: "your_template_id",
      user_id: "your_user_id",
      template_params: {
        email: clientEmail,
        subject: "Recycling Submission Status",
        message: "Your recycling submission has been cleared successfully.",
      },
    };

    try {
      const response = await axios.post("https://api.emailjs.com/api/v1.0/email/send", emailData);
      if (response.status === 200) {
        console.log("Email sent successfully!");
      } else {
        console.error("Failed to send email.");
      }
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  return (
    <div className="recycling-admin-container" style={styles.container}>
      <h1 style={styles.header}>Recycling Submissions</h1>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>Name</th>
            <th style={styles.tableHeader}>Address</th>
            <th style={styles.tableHeader}>Description</th>
            <th style={styles.tableHeader}>Image</th>
            <th style={styles.tableHeader}>Location</th>
            <th style={styles.tableHeader}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((submission) => (
            <tr key={submission.id} style={styles.tableRow}>
              <td style={styles.tableCell}>{submission.name}</td>
              <td style={styles.tableCell}>{submission.address} </td>
              <td style={styles.tableCell}>{submission.description}</td>
              <td style={styles.tableCell}>
                {submission.image ? (
                  <img
                    src={submission.image}
                    alt="Uploaded"
                    style={styles.image}
                  />
                ) : (
                  "No Image"
                )}
              </td>
              <td style={styles.tableCell}>{submission.location}</td>
              <td style={styles.tableCell}>
                <button
                  onClick={() => handleClear(submission.id, submission.email)}
                  style={styles.button}
                >
                  Clear
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    
  );
};

const styles = {
    container: {
      padding: "20px",
      backgroundColor: "#f4f4f9",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    header: {
      textAlign: "center",
      color: "#333",
      marginBottom: "20px",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      marginTop: "20px",
    },
    tableHeader: {
      backgroundColor: "#4CAF50",
      color: "white",
      padding: "12px 15px",
      textAlign: "left",
    },
    tableRow: {
      borderBottom: "1px solid #ddd",
    },
    tableCell: {
      padding: "12px 15px",
      textAlign: "left",
    },
    image: {
      width: "100px",
      height: "auto",
    },
    button: {
      backgroundColor: "#4CAF50",
      color: "white",
      border: "none",
      padding: "8px 16px",
      cursor: "pointer",
      borderRadius: "4px",
    },
  };

export default RecyclingAdmin;
