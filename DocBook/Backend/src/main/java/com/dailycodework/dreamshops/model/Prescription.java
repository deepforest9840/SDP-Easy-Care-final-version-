package com.dailycodework.dreamshops.model;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;

@Entity
public class Prescription {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String patientEmail;
    private String patientName;
    private String doctorName;
    private String doctorEmail;
    private String doctorDescription;
    private String appointmentDate;
    private Long dappointmentId;
    private Long appointmentId;

     // New field for creation date and time
    // @Column(name = "pcreation_datetime", nullable = false, updatable = false, columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    // private LocalDateTime pcreationDatetime;
    @Column(name = "pcreation_datetime", nullable = false, updatable = false, insertable = false, columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime pcreationDatetime;


    // New field for seen status
    @Column(name = "seen_status")
    private String seenStatus;


    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "prescription_id")
    private List<Medicine> medicines;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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

    public String getDoctorDescription() {
        return doctorDescription;
    }

    public void setDoctorDescription(String doctorDescription) {
        this.doctorDescription = doctorDescription;
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

    public void setDappointmentId(Long dappointmentId) {
        this.dappointmentId = dappointmentId;
    }

    public Long getAppointmentId() {
        return appointmentId;
    }

    public void setAppointmentId(Long appointmentId) {
        this.appointmentId = appointmentId;
    }

    public List<Medicine> getMedicines() {
        return medicines;
    }

    public void setMedicines(List<Medicine> medicines) {
        this.medicines = medicines;
    }

    public void setSeenStatus(String status)
    {
        this.seenStatus = status ; 
    }
    public String getSeenStatus()
    {
        return seenStatus ;
    }
    public LocalDateTime getPcreationTime()
    {
        return this.pcreationDatetime ;
    }
    public void setPcreationTime(LocalDateTime t)
    {
        this.pcreationDatetime = t ;
    }

    // Getters and Setters

    @Override
    public String toString() {
        return "Prescription{" +
                "id=" + id +
                ", patientEmail='" + patientEmail + '\'' +
                ", patientName='" + patientName + '\'' +
                ", doctorName='" + doctorName + '\'' +
                ", doctorEmail='" + doctorEmail + '\'' +
                ", doctorDescription='" + doctorDescription + '\'' +
                ", appointmentDate='" + appointmentDate + '\'' +
                ", dappointmentId='" + dappointmentId + '\'' +
                ", appointmentId='" + appointmentId + '\'' +
                ", medicines=" + medicines +
                '}';
    }
}
