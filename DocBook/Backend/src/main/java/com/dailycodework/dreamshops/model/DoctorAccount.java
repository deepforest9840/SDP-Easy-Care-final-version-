package com.dailycodework.dreamshops.model;

import jakarta.persistence.*;

@Entity
public class DoctorAccount {
    
    @Id
    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String doctor_name;

    private String loginStatus ;

    public DoctorAccount() {}

    public DoctorAccount(String email, String password, String doctor_name) {
        this.email = email;
        this.password = password;
        this.doctor_name = doctor_name;
    }

    // Getters and Setters
   
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getDoctor_name() {
        return doctor_name;
    }

    public void setDoctor_name(String doctor_name) {
        this.doctor_name = doctor_name ;
    }
    public void setLoginStatus(String status){
        this.loginStatus = status ; 
    }
    public String getLoginStatus()
    {
        return this.loginStatus ;
    }
}
