package com.dailycodework.dreamshops.model;

import java.util.List;

import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;

public class PrescriptionBuilder {
    
     private Long id;

    private String patientEmail;
    private String patientName;
    private String doctorName;
    private String doctorEmail;
    private String doctorDescription;
    private String appointmentDate;
    private Long dappointmentId ; // Ensure the field matches the correct case or adjust mapping
    private Long appointmentId;
    private List<Medicine> medicines;


    public PrescriptionBuilder() {
    }
    // Getters and Setters
    public Long getId() {
        return id;
    }
    public PrescriptionBuilder setId(Long id) {
        this.id = id;
        return this ;
    }
    public String getPatientEmail() {
        return patientEmail;
    }
    public PrescriptionBuilder setPatientEmail(String patientEmail) {
        this.patientEmail = patientEmail;
        return this ;
    }
    public String getPatientName() {
        return patientName;
    }
    public PrescriptionBuilder setPatientName(String patientName) {
        this.patientName = patientName;
        return this ;
    }
    public String getDoctorName() {
        return doctorName;
    }
    public PrescriptionBuilder setDoctorName(String doctorName) {
        this.doctorName = doctorName;
        return this ;
    }
    public String getDoctorEmail() {
        return doctorEmail;
        
    }
    public PrescriptionBuilder setDoctorEmail(String doctorEmail) {
        this.doctorEmail = doctorEmail;
        return this ;
    }
    public String getAppointmentDate() {
        return appointmentDate;
    }
    public PrescriptionBuilder setAppointmentDate(String appointmentDate) {
        this.appointmentDate = appointmentDate;
        return this ;
    }
    public Long getDappointmentId() {
        return dappointmentId;
    }
    public PrescriptionBuilder setDappointmentId(Long dappointmentId) {
        this.dappointmentId = dappointmentId;
        return this ;
    }
    public Long getAppointmentId() {
        return appointmentId;
    }
    public PrescriptionBuilder setAppointmentId(Long appointmentId) {
        this.appointmentId = appointmentId;
        return this ;
    }
    public String getDoctorDescription() {
        return doctorDescription;
    }
    public PrescriptionBuilder setDoctorDescription(String doctorDescription) {
        this.doctorDescription = doctorDescription;
        return this ;
    }
    public List<Medicine> getMedicines() {
        return medicines;
    }
    public PrescriptionBuilder setMedicines(List<Medicine> medicines) {
        this.medicines = medicines;
        return this ;
    }
    // public Prescription build() {
    //     return new Prescription(patientEmail, patientName, doctorName, doctorEmail, doctorDescription, appointmentDate, dappointmentId, appointmentId, medicines);  

    // }
    
}
