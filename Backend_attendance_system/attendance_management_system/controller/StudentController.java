package com.example.attendance_management_system.controller;

import com.example.attendance_management_system.model.Student;
import com.example.attendance_management_system.repository.StudentRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/students")

public class StudentController {

    private final StudentRepository studentRepository;

    public StudentController(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }
    

    // 1️⃣ Create a new student
    @PostMapping
    public Student createStudent(@RequestBody Student student) {
        return studentRepository.save(student);
    }

    // 2️⃣ Get all students
    @GetMapping
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    // 3️⃣ Get a student by ID
    @GetMapping("/{id}")
    public ResponseEntity<Student> getStudentById(@PathVariable Long id) {
        Optional<Student> student = studentRepository.findById(id);
        return student.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // 4️⃣ Update a student
    @PutMapping("/{id}")
    public ResponseEntity<Student> updateStudent(@PathVariable Long id, @RequestBody Student studentDetails) {
        return studentRepository.findById(id)
            .map(student -> {
                student.setName(studentDetails.getName());
                student.setRollNumber(studentDetails.getRollNumber());
                student.setEmail(studentDetails.getEmail());
                Student updatedStudent = studentRepository.save(student);
                return ResponseEntity.ok(updatedStudent);
            }).orElseGet(() -> ResponseEntity.notFound().build());
    }
    @DeleteMapping("/{id}")
public ResponseEntity<Void> deleteStudent(@PathVariable Long id) {
    Optional<Student> student = studentRepository.findById(id);
    
    if (student.isPresent()) {
        studentRepository.delete(student.get()); // Fetch actual object before deleting
        return ResponseEntity.ok().build();
    } else {
        return ResponseEntity.notFound().build();
    }
}
}
