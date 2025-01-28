package com.dailycodework.dreamshops.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
@Table(name = "appointments") // Explicit table name
public class dAppointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "doctor_id", nullable = false)
    private Long doctorId;

    @Column(name = "hospital_id", nullable = false)
    private Long hospitalId;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS")
    @Column(nullable = false)
    private LocalDateTime time;

    @Column(nullable = false)
    private Double fee;

   
    private int noOfPatient = 0; // Default to 0 when no patients are booked
    public dAppointment() {
    }

    // Constructor (without doctor and hospital objects)
    public dAppointment(Long doctorId, Long hospitalId, LocalDateTime time, Double fee) {
        this.doctorId = doctorId;
        this.hospitalId = hospitalId;
        this.time = time;
        this.fee = fee;
        this.noOfPatient=1;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getDoctorId() {
        return doctorId;
    }

    public void setDoctorId(Long doctorId) {
        this.doctorId = doctorId;
    }

    public Long getHospitalId() {
        return hospitalId;
    }

    public void setHospitalId(Long hospitalId) {
        this.hospitalId = hospitalId;
    }

    public LocalDateTime getTime() {
        return time;
    }

    public void setTime(LocalDateTime time) {
        this.time = time;
    }

    public Double getFee() {
        return fee;
    }

    public void setFee(Double fee) {
        this.fee = fee;
    }

    public int getNoOfPatient() {
        return noOfPatient;
    }

    public void setNoOfPatient(int noOfPatient) {
        this.noOfPatient = noOfPatient;
    }
}
