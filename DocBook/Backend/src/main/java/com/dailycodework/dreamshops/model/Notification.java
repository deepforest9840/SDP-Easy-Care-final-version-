package com.dailycodework.dreamshops.model;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.*;

@Data
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "notifications")
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String message;
    private String userEmail;  // To specify the recipient's email

    private LocalDateTime timestamp;

    @ManyToOne
    @JoinColumn(name = "donor_id", nullable = false)
    private Donor donor;  // Ensure Donor entity exists

    @ManyToOne
    @JoinColumn(name = "urgent_donor_id", nullable = false)
    private UrgentDonor urgentDonor;  // Link to the urgent donor who triggered the notification
}
