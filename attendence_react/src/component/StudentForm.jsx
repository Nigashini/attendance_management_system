import React, { useState } from "react";

const StudentForm = ({ setStudents }) => {
  const [newStudent, setNewStudent] = useState({ name: "", rollNumber: "", email: "" });

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newStudent),
    })
      .then((response) => response.json())
      .then((addedStudent) => {
        setStudents((prevStudents) => [...prevStudents, addedStudent]);
        setNewStudent({ name: "", rollNumber: "", email: "" });
      })
      .catch((error) => console.error("Error adding student:", error));
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h3>Add New Student</h3>
      <input type="text" name="name" value={newStudent.name} onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })} placeholder="Name" required />
      <input type="text" name="rollNumber" value={newStudent.rollNumber} onChange={(e) => setNewStudent({ ...newStudent, rollNumber: e.target.value })} placeholder="Roll Number" required />
      <input type="email" name="email" value={newStudent.email} onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })} placeholder="Email" required />
      <button type="submit">Add Student</button>
    </form>
  );
};

export default StudentForm;
