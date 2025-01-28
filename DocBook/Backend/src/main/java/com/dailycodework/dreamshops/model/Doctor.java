package com.dailycodework.dreamshops.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;
@Getter
@Setter
@NoArgsConstructor

@Entity
public class Doctor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    
    @Column(nullable = false, unique = true)
    private String gmail;

   
    private String name;

   
    private String hospitalName; // Academic or official hospital

   
    private String description;

    private int experience;

   
    private double rating;
     // Star value (e.g., 4.5)

   private int noOfPatients;


    private String status;


    public Doctor( String gmail, String name, String hospitalName, String description,  int experience, String status, Category category) {

        this.gmail = gmail;
        this.name = name;
        this.hospitalName = hospitalName;
        this.description = description;

        this.experience = experience;
        this.rating = 4;
        this.noOfPatients=1;
        this.status = status;
        this.category = category;

    }



    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "category_id")
    private Category category;



    @OneToMany(mappedBy = "doctor",cascade = CascadeType.ALL, orphanRemoval = true )
    private List<Image> images;

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getGmail() {
        return gmail;
    }

    public void setGmail(String gmail) {
        this.gmail = gmail;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getHospitalName() {
        return hospitalName;
    }

    public void setHospitalName(String hospitalName) {
        this.hospitalName = hospitalName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getExperience() {
        return experience;
    }

    public void setExperience(int experience) {
        this.experience = experience;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public List<Image> getImages() {
        return images;
    }

    public void setImages(List<Image> images) {
        this.images = images;
    }

    public int getNoOfPatients() {
        return noOfPatients;
    }

    public void setNoOfPatients(int noOfPatients) {
        this.noOfPatients = noOfPatients;
    }
}
