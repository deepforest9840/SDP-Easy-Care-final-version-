package com.dailycodework.dreamshops.dto;

import com.dailycodework.dreamshops.model.Category;
import com.dailycodework.dreamshops.model.Image;
import lombok.Data;

import java.util.List;

@Data
public class DoctorDto {

    private Long id;
    private String gmail;
    private String name;
    private String hospitalName;
    private String description;
    private int experience;
    private double rating;
    
    private int noOfPatients;


    private String status;
    private Category category; // Added category reference
    private List<ImageDto> images;

    public List<ImageDto> getImages() {
        return images;
    }

    public void setImages(List<ImageDto> images) {
        this.images = images;
    }
    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }



    public int getNoOfPatients() {
        return noOfPatients;
    }

    public void noOfPatients(int rating) {
        this.noOfPatients = rating;
    }

    public int getExperience() {
        return experience;
    }

    public void setExperience(int experience) {
        this.experience = experience;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getHospitalName() {
        return hospitalName;
    }

    public void setHospitalName(String hospitalName) {
        this.hospitalName = hospitalName;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getGmail() {
        return gmail;
    }

    public void setGmail(String gmail) {
        this.gmail = gmail;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
// Added list of images
}
