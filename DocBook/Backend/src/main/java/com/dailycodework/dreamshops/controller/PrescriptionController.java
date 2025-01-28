package com.dailycodework.dreamshops.controller;

import com.dailycodework.dreamshops.model.Prescription;
import com.dailycodework.dreamshops.service.prescription.PrescriptionService;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/prescriptions")
public class PrescriptionController {

    private final PrescriptionService prescriptionService;

    public PrescriptionController(PrescriptionService prescriptionService) {
        this.prescriptionService = prescriptionService;
    }

    @PostMapping("/addprescription")
    public ResponseEntity<Prescription> createPrescription(@RequestBody Prescription prescription) {
        System.out.println("Prescription Details: " + prescription.toString());
        Prescription savedPrescription = prescriptionService.savePrescription(prescription);
        return ResponseEntity.ok(savedPrescription);
    }
    @GetMapping("/getprescriptionByAppointmentId")
    public ResponseEntity<List<Prescription>> getPrescriptionByAppointmentId(@RequestParam Long appointmentId) {
        List<Prescription> prescription = prescriptionService.getPrescriptionByAppId(appointmentId);
        return ResponseEntity.ok(prescription);
    }

    @GetMapping("/getprescriptionByPatientEmail")
    public ResponseEntity<List<Prescription>> getPrescriptionByPatientEmail(@RequestParam String patientEmail) {
        List<Prescription> prescription = prescriptionService.getPrescriptionByPatientEmail(patientEmail);
        return ResponseEntity.ok(prescription);
    }

    @GetMapping("/updateSeenStatus")
    public ResponseEntity<?> updateSeenStatus(@RequestParam Long id) {
        try {
            
            prescriptionService.updateSeenStatus(id, "seen");
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating seenStatus");
        }
    }
}
