package com.dailycodework.dreamshops.dto;

import java.util.List;

import com.dailycodework.dreamshops.model.Medicine;

public class PrescriptionDto {
    private String patientEmail;
    private String patientName;
    private String doctorName;
    private String doctorEmail;
    private String appointmentDate;
    private Long dappointmentId ; // Ensure the field matches the correct case or adjust mapping
    private Long appointmentId;
    private String doctorDescription;
    private List<Medicine> medicines;

    // Getters and Setters

   

    public String getPatientEmail() {
        return patientEmail;
    }

    public void setPatientEmail(String patientEmail) {
        this.patientEmail = patientEmail;
    }

    public String getPatientName() {
        return patientName;
    }

    public void setPatientName(String patientName) {
        this.patientName = patientName;
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

    public String getAppointmentDate() {
        return appointmentDate;
    }

    public void setAppointmentDate(String appointmentDate) {
        this.appointmentDate = appointmentDate;
    }

    public Long getDappointmentId() {
        return dappointmentId;
    }

    public void setDappointmentId(Long dAppointmentId) {
        this.dappointmentId = dAppointmentId;
    }

    public Long getAppointmentId() {
        return appointmentId;
    }
    public void setAppointmentId(Long appointmentId) {
        this.appointmentId = appointmentId;
    }

    public String getDoctorDescription() {
        return doctorDescription;
    }

    public void setDoctorDescription(String doctorDescription) {
        this.doctorDescription = doctorDescription;
    }

    public List<Medicine> getMedicines() {
        return medicines;
    }

    public void setMedicines(List<Medicine> medicines) {
        this.medicines = medicines;
    }
}
