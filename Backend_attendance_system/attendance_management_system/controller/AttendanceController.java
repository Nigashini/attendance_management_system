package com.example.attendance_management_system.controller;
import com.example.attendance_management_system.model.Attendance;
import com.example.attendance_management_system.service.AttendanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/attendance")
public class AttendanceController {
    @Autowired
    private AttendanceService attendanceService;

    @GetMapping("/{studentId}")
    public List<Attendance> getAttendance(@PathVariable Long studentId) {
        return attendanceService.getAttendanceByStudent(studentId);
    }

    @PostMapping
    public Attendance markAttendance(@RequestBody Attendance attendance) {
        return attendanceService.saveAttendance(attendance);
    }
}
