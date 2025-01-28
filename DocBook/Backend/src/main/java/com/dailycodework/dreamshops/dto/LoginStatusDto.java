package com.dailycodework.dreamshops.dto;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
public class LoginStatusDto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String status; // e.g., "SUCCESS" or "FAILED"

    @Column(nullable = false)
    private LocalDateTime loginTime;

    // Default Constructor
    public LoginStatusDto() {
    }

    // Parameterized Constructor
    public LoginStatusDto(String email, String status, LocalDateTime loginTime) {
        this.email = email;
        this.status = status;
        this.loginTime = loginTime;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getLoginTime() {
        return loginTime;
    }

    public void setLoginTime(LocalDateTime loginTime) {
        this.loginTime = loginTime;
    }
}
