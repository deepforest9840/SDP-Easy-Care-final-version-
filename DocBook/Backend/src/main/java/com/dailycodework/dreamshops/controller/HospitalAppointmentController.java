package com.dailycodework.dreamshops.controller;

import com.dailycodework.dreamshops.model.HospitalAppointment;
import com.dailycodework.dreamshops.service.hospitalappointment.HospitalAppointmentService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/hospitalsstat")
public class HospitalAppointmentController {

    @Autowired
    private HospitalAppointmentService service;

    // Add a new appointment
    @PostMapping("/add")
    public HospitalAppointment addAppointment(@RequestBody HospitalAppointment appointment) {
        return service.addAppointment(appointment);
    }

    // Delete an appointment by appid
    @DeleteMapping("/delete/{appid}")
    public String deleteAppointmentById(@PathVariable Long appid) {
        service.deleteAppointmentById(appid);
        return "Appointment deleted successfully.";
    }

    // Get hospital stats (distinct name and sum of noOfPatient)
    @GetMapping("/getHospitalStats")
    public List<Map<String, Object>> getHospitalStats() {
        return service.getHospitalStats().stream()
                .map(obj -> Map.of("name", obj[0], "totalPatients", obj[1]))
                .collect(Collectors.toList());
    }

    // Get stats for a specific name (distinct area and sum of noOfPatient)
    @GetMapping("/getAreaStats")
    public List<Map<String, Object>> getAreaStatsByName(@RequestParam String name) {
        return service.getAreaStatsByName(name).stream()
                .map(obj -> Map.of("area", obj[0], "totalPatients", obj[1]))
                .collect(Collectors.toList());
    }

    

    // Get hospital stats for a specific area
@GetMapping("/getHospitalStatsByArea")
public List<Map<String, Object>> getHospitalStatsByArea(@RequestParam String area) {
    return service.getHospitalStatsByArea(area).stream()
            .map(obj -> Map.of("name", obj[0], "totalPatients", obj[1]))
            .collect(Collectors.toList());
}












}
