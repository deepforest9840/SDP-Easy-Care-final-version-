package com.dailycodework.dreamshops.dto;

import com.dailycodework.dreamshops.model.commonInterface;


public class AppointmentDoctorDto implements commonInterface {
    private String patientName;
    private String patientEmail;
    private String appointmentDate;
    private String doctorName;
    private String doctorGmail;

    // Constructor, getters, setters
    public AppointmentDoctorDto(String patientName, String email, String appointmentDate, String doctorName, String doctorGmail) {
        this.patientName = patientName;
        this.patientEmail = email;
        this.appointmentDate = appointmentDate;
        this.doctorName = doctorName;
        this.doctorGmail = doctorGmail;
    }

    // Getters and setters

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

    public String getAppointmentDate() {
        return appointmentDate;
    }

    public void setAppointmentDate(String appointmentDate) {
        this.appointmentDate = appointmentDate;
    }

    public String getDoctorName() {
        return doctorName;
    }

    public void setDoctorName(String doctorName) {
        this.doctorName = doctorName;
    }

    public String getDoctorGmail() {
        return doctorGmail;
    }

    public void setDoctorGmail(String doctorGmail) {
        this.doctorGmail = doctorGmail;
    }
}
