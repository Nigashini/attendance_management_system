import React, { useState, useEffect } from "react";
import StudentForm from "./StudentForm";
import "../styles.css"; 

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [formData, setFormData] = useState({ name: "", rollNumber: "", email: "" });

  // Fetch Students from API
  useEffect(() => {
    fetch("http://localhost:8080/students")
      .then((response) => response.json())
      .then((data) => setStudents(data))
      .catch((error) => console.error("Error fetching students:", error));
  }, []);

  // Handle Delete
  const handleDelete = (id) => {
    fetch(`http://localhost:8080/students/${id}`, { method: "DELETE" })
      .then(() => setStudents(students.filter((student) => student.id !== id)))
      .catch((error) => console.error("Error deleting student:", error));
  };

  // Handle Edit (Set Form Data)
  const handleEdit = (student) => {
    setEditingStudent(student.id);
    setFormData({ name: student.name, rollNumber: student.rollNumber, email: student.email });
  };

  // Handle Update
  const handleUpdate = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8080/students/${editingStudent}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((updatedStudent) => {
        setStudents(students.map((student) => (student.id === updatedStudent.id ? updatedStudent : student)));
        setEditingStudent(null);
        setFormData({ name: "", rollNumber: "", email: "" });
      })
      .catch((error) => console.error("Error updating student:", error));
  };

  return (
    <div className="container">
      <h2>Students List</h2>
      <ul className="student-list">
        {students.map((student) => (
          <li key={student.id} className="student-item">
            <span>{student.name} - {student.rollNumber} - {student.email}</span>
            <button onClick={() => handleEdit(student)} className="edit-btn">Edit</button>
            <button onClick={() => handleDelete(student.id)} className="delete-btn">Delete</button>
          </li>
        ))}
      </ul>

      {editingStudent && (
        <form onSubmit={handleUpdate} className="form">
          <h3>Edit Student</h3>
          <input type="text" name="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Name" required />
          <input type="text" name="rollNumber" value={formData.rollNumber} onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })} placeholder="Roll Number" required />
          <input type="email" name="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="Email" required />
          <button type="submit">Update</button>
          <button onClick={() => setEditingStudent(null)} className="cancel-btn">Cancel</button>
        </form>
      )}

      {/* Add Student Form */}
      <StudentForm setStudents={setStudents} />
    </div>
  );
};

export default StudentList;
