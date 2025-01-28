package com.dailycodework.dreamshops.model;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;

import com.dailycodework.dreamshops.repository.AppointmentRepository;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;


@Entity
public class Appointment implements commonInterface {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Patient name is required")
    private String patientName;

    @NotBlank(message = "Patient email is required")
    private String email;


    @NotBlank(message = "Contact number is required")
    private String contactNumber;

    @NotNull(message = "Appointment date is required")
    private LocalDateTime appointmentDate;

    @NotBlank(message = "Status is required")
    private String status;

    @NotNull(message = "DappointmentId is required")
    private Long dappointmentId ;

   

    @NotNull(message = "Doctor ID is required")
    private Long doctorId;
    




    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }
    public Long getDAppointmentId() {
        return dappointmentId;
    }
    public void setDAppointmentId(Long DAppointmentId) {
        this.dappointmentId = DAppointmentId;
    }

    public String getEmail() {
        return this.email ;
    }

    public void setEmail(String email) {
        this.email = email;
    }
    public String getPatientName() {
        return patientName;
    }

    public void setPatientName(String patientName) {
        this.patientName = patientName;
    }

    public String getContactNumber() {
        return contactNumber;
    }

    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
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
    

  
}
