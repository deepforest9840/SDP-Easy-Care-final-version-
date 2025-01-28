package com.dailycodework.dreamshops.controller;

import com.dailycodework.dreamshops.model.dAppointment;
import com.dailycodework.dreamshops.service.dappointment.dAppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/dappointments")
public class dAppointmentController {

    @Autowired
    private dAppointmentService appointmentService;

    // Create a new appointment
    @PostMapping("/add")
    public ResponseEntity<dAppointment> createAppointment(@RequestBody dAppointment appointment) {
        // Creating the appointment with the provided details
        dAppointment createdAppointment = appointmentService.createAppointment(appointment);
        return ResponseEntity.ok(createdAppointment);
    }

    // Get all appointments
    @GetMapping("/all")
    public ResponseEntity<List<dAppointment>> getAllAppointments() {
        List<dAppointment> appointments = appointmentService.getAllAppointments();
        return ResponseEntity.ok(appointments);
    }

    // Get appointments before a specific time
   

    // Get appointments by hospital area
    // @GetMapping("/by-area")
    // public ResponseEntity<List<dAppointment>> getAppointmentsByArea(@RequestParam("area") String area) {
    //     List<dAppointment> appointments = appointmentService.getAppointmentsByHospitalArea(area);
    //     return ResponseEntity.ok(appointments);
    // }

    // Get appointments by hospital name
    // @GetMapping("/by-name")
    // public ResponseEntity<List<dAppointment>> getAppointmentsByName(@RequestParam("name") String name) {
    //     List<dAppointment> appointments = appointmentService.getAppointmentsByHospitalName(name);
    //     return ResponseEntity.ok(appointments);
    // }


    @PostMapping("/book/{appointmentId}")
    public ResponseEntity<String> bookAppointment(@PathVariable Long appointmentId) {
        try {
            appointmentService.incrementNoOfPatient(appointmentId);
            return ResponseEntity.ok("Patient booked successfully for appointment ID " + appointmentId);
        } catch (Exception e) {
            return ResponseEntity.status(404).body("Appointment not found");
        }
    }

    @GetMapping("/no-of-patients/{appointmentId}")
    public ResponseEntity<String> getNoOfPatients(@PathVariable Long appointmentId) {
        try {
            int numberOfPatients = appointmentService.getNoOfPatients(appointmentId);
            return ResponseEntity.ok("Number of patients for appointment ID " + appointmentId + ": " + numberOfPatients);
        } catch (Exception e) {
            return ResponseEntity.status(404).body("Appointment not found");
        }
    }


    @GetMapping("/by-fee")
    public ResponseEntity<List<dAppointment>> getAppointmentsByFee(@RequestParam("fee") double fee) {
        List<dAppointment> appointments = appointmentService.getAppointmentsByFee(fee);
        return ResponseEntity.ok(appointments);
    }

    @GetMapping("/before-time")
    public ResponseEntity<List<dAppointment>> getAppointmentsBeforeTime(@RequestParam("time") String time) {
        LocalDateTime parsedTime = LocalDateTime.parse(time);
        List<dAppointment> appointments = appointmentService.getAppointmentsBeforeTime(parsedTime);
        return ResponseEntity.ok(appointments);
    }
 @GetMapping("/by-hospital-name")
    public List<dAppointment> getAppointmentsByHospitalName(@RequestParam("name") String hospitalName) {
        return appointmentService.findAppointmentsByHospitalName(hospitalName);
    }


   

    @GetMapping("/by-area")
    public List<dAppointment> getAppointmentsByHospitalArea(@RequestParam("area") String hospitalArea) {
        return appointmentService.findAppointmentsByHospitalArea(hospitalArea);
    }

    // dAppointmentController.java

@GetMapping("/by-category")
public List<dAppointment> getAppointmentsByCategory(@RequestParam("category") String categoryName) {
    return appointmentService.getAppointmentsByCategory(categoryName);
}









@GetMapping("/appointments-by-filtering")
public List<dAppointment> getAppointments(@RequestParam(required = false) String name,
                                          @RequestParam(required = false) String area,
                                          @RequestParam(required = false) Double fee,
                                          
                                          @RequestParam(required = false) String category) {
    return appointmentService.filterAppointments(name, area, fee,category);
}


  @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteAppointment(@PathVariable("id") Long appointmentId) {
        try {
            appointmentService.deleteAppointment(appointmentId);
            return ResponseEntity.ok("Appointment with ID " + appointmentId + " has been deleted successfully.");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }








}

