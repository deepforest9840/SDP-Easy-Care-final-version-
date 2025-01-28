package com.dailycodework.dreamshops.model;

import lombok.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;

import java.util.List;

@Data
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "urgentdonors")
public class UrgentDonor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String bloodGroup;
    private String location;
    private String phone;
    private String email;


    private String requiredDate; // New field for required date
    private String requiredTime; // New field for required time
    private int quantity;     

    
    @JsonIgnore
    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @JsonIgnore
    @OneToMany(mappedBy = "urgentDonor", cascade = CascadeType.ALL)    
    private List<Notification> notifications;
}