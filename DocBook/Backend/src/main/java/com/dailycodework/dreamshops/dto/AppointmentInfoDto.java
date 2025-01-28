package com.dailycodework.dreamshops.dto;

import java.time.LocalDateTime;
import java.util.Date;


public class AppointmentInfoDto {
    private Long appointmentId;
    private String patientName;
    private String patientEmail;
    private String patientContactNumber;
    private LocalDateTime appointmentDate;
    private String doctorName;
    private String doctorEmail;
    private String address;
    private String doctorDescription;
    private String status ;
    private Long dappointmentId ;
    


    // Constructor
    public AppointmentInfoDto(Long appointmentId,String patientName, String patientEmail, String patientContactNumber, LocalDateTime appointmentDate, String doctorName, String doctorEmail, String description , String address,String status,Long DAppointmentId) {   
        this.appointmentId = appointmentId;
        this.patientName = patientName;
        this.patientEmail = patientEmail;
        this.patientContactNumber = patientContactNumber;
        this.appointmentDate = appointmentDate;
        this.doctorName = doctorName;
        this.doctorEmail = doctorEmail;
        this.doctorDescription = description;
        this.address = address;
        this.status = status;
        this.dappointmentId = DAppointmentId;
    }
    public Long getDAppointmentId() {
        return dappointmentId;
    }
    public void setDAppointmentId(Long DAppointmentId) {
        this.dappointmentId = DAppointmentId;
    }
    public void setStatus(String status) {
        this.status = status;
    }
    public String getStatus() {
        return this.status;
    }
    public void SetDoctorDescription(String doctorDescription) {
        this.doctorDescription = doctorDescription;
    }
    public String getDoctorDescription() {
        return doctorDescription;
    }
    public void SetAppointmentId(Long appointmentId) {
        this.appointmentId = appointmentId;
        
    }
    public Long getAppointmentId() {
        return appointmentId;
    }
    // Getters and Setters
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

    public String getPatientContactNumber() {
        return patientContactNumber;
    }

    public void setPatientContactNumber(String patientContactNumber) {
        this.patientContactNumber = patientContactNumber;
    }

    public LocalDateTime getAppointmentDate() {
        return appointmentDate;
    }

    public void setAppointmentDate(LocalDateTime appointmentDate) {
        this.appointmentDate = appointmentDate;
    }

    public String getDoctorName() {
        return doctorName;
    }

    public void setDoctorName(String doctorName) {
        this.doctorName = doctorName;
    }

    public String getDoctorEmail() {
        return doctorEmail;
    }

    public void setDoctorEmail(String doctorEmail) {
        this.doctorEmail = doctorEmail;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}