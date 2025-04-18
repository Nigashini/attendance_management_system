import React from "react";
import StudentList from "./component/StudentList";
import "./styles.css";

function App() {
  return (
    <div className="app">
      <h1>Student Attendance Management System</h1>
      <StudentList />
    </div>
  );
}

export default App;
