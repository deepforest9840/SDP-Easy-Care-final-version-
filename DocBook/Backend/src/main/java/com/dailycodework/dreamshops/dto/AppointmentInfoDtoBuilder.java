package com.dailycodework.dreamshops.dto;

import java.sql.Date;
import java.time.LocalDateTime;

import com.dailycodework.dreamshops.model.Appointment;

public class AppointmentInfoDtoBuilder {
    private Long appointmentId;
    private String patientName;
    private String patientEmail;
    private String patientContactNumber;
    private LocalDateTime appointmentDate;
    private String doctorName;
    private String doctorEmail;
    private String doctorDescription ;
    private String address;
    private String status ;
    private Long dappointmentId ;

    // Constructor
    //AppointmentInfoDtoBuilder(){}

    public AppointmentInfoDtoBuilder setDAppointmentId(Long DAppointmentId) {
        this.dappointmentId = DAppointmentId;
        return this ;
    }
    public Long getDAppointmentId() {
        return dappointmentId;
    }

    public AppointmentInfoDtoBuilder setAppointmentId(Long appointmentId) {
        this.appointmentId = appointmentId;
        return this ;
    }
    public AppointmentInfoDtoBuilder setStatus(String status) {
        this.status = status;
        return this ;
    }
    public String getStatus() {
        return this.status;
    }   
    // Getters and Setters
    public String getPatientName() {
        return patientName;
    }

    public AppointmentInfoDtoBuilder setPatientName(String patientName) {
        this.patientName = patientName;
        return this ;
    }

    public String getPatientEmail() {
        return patientEmail;
    }

    public AppointmentInfoDtoBuilder setPatientEmail(String patientEmail) {
        this.patientEmail = patientEmail;
        return this ;
    }

    public String getPatientContactNumber() {
        return patientContactNumber;
    }

    public AppointmentInfoDtoBuilder setPatientContactNumber(String patientContactNumber) {
        this.patientContactNumber = patientContactNumber;
        return this ;
    }

    public LocalDateTime getAppointmentDate() {
        return appointmentDate;
    }

    public AppointmentInfoDtoBuilder setAppointmentDate(LocalDateTime appointmentDate) {
        this.appointmentDate = appointmentDate;
        return this ;
    }

    public String getDoctorName() {
        return doctorName;
    }

    public AppointmentInfoDtoBuilder setDoctorName(String doctorName) {
        this.doctorName = doctorName;
        return this ;
    }

    public String getDoctorEmail() {
        return doctorEmail;
    }

    public AppointmentInfoDtoBuilder setDoctorEmail(String doctorEmail) {
        this.doctorEmail = doctorEmail;
        return this ;
    }

    public String getDoctorDescription() {
        return doctorDescription;
    }
    public AppointmentInfoDtoBuilder setDoctorDescription(String doctorDescription) {
        this.doctorDescription = doctorDescription;
        return this ;
    }

    public String getAddress() {
        return address;
    }

    public AppointmentInfoDtoBuilder setAddress(String address) {
        this.address = address;
        return this ;
    }

    public AppointmentInfoDto build() {
        return new AppointmentInfoDto(appointmentId, patientName, patientEmail, patientContactNumber, appointmentDate, doctorName, doctorEmail,doctorDescription, address,status,dappointmentId);
    }
}
