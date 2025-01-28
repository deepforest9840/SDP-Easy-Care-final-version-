package com.dailycodework.dreamshops.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

public class AppointmentCart {
    
    private Long id;
    private String patientName;
    private String patientEmail;
    private String PatientcontactNumber;
    private LocalDateTime appointmentDate;
    private Long doctorId;
    private String doctorName;
    private String description ;

    
    public AppointmentCart(Long id, String patientName, String patientEmail, String patientcontactNumber,
            LocalDateTime appointmentDate, Long doctorId, String doctorName, String description) {
        this.id = id;
        this.patientName = patientName;
        this.patientEmail = patientEmail;
        PatientcontactNumber = patientcontactNumber;
        this.appointmentDate = appointmentDate;
        this.doctorId = doctorId;
        this.doctorName = doctorName;
        this.description = description;
    }
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getPatientName() {
        return patientName;
    }
    public void setPatientName(String patientName) {
        this.patientName = patientName;
    }
    public String getPatientEmail() {
        return patientEmail;
    }
    public void setPatientEmail(String patientEmail) {
        this.patientEmail = patientEmail;
    }
    public String getPatientcontactNumber() {
        return PatientcontactNumber;
    }
    public void setPatientcontactNumber(String patientcontactNumber) {
        PatientcontactNumber = patientcontactNumber;
    }
    public LocalDateTime getAppointmentDate() {
        return appointmentDate;
    }
    public void setAppointmentDate(LocalDateTime appointmentDate) {
        this.appointmentDate = appointmentDate;
    }
    public Long getDoctorId() {
        return doctorId;
    }
    public void setDoctorId(Long doctorId) {
        this.doctorId = doctorId;
    }
    public String getDoctorName() {
        return doctorName;
    }
    public void setDoctorName(String doctorName) {
        this.doctorName = doctorName;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }

    
}
