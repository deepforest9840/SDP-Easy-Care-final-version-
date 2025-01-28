package com.dailycodework.dreamshops.model;      

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
@Entity
@Table(name = "hospital_appointments")
public class HospitalAppointment {

    @Id
    private Long appid;
    private String name;
    private String area;

    @Column(name = "no_of_patient")
    private Integer noOfPatient; // Changed from int to Integer

    public HospitalAppointment() {
        // Default constructor
    }

    public HospitalAppointment(Long appid, String name, String area, Integer noOfPatient) {
        this.appid = appid;
        this.name = name;
        this.area = area;
        this.noOfPatient = noOfPatient;
    }

    // Getters and Setters
    public Long getAppid() {
        return appid;
    }

    public void setAppid(Long appid) {
        this.appid = appid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getArea() {
        return area;
    }

    public void setArea(String area) {
        this.area = area;
    }

    public Integer getNoOfPatient() {
        return noOfPatient;
    }

    public void setNoOfPatient(Integer noOfPatient) {
        this.noOfPatient = noOfPatient;
    }
}
