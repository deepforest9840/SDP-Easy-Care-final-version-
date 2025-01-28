package com.dailycodework.dreamshops.dto;

import com.dailycodework.dreamshops.model.Category_medicine;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class MedicineProductDto {
    private Long id;
    private String name;
    private String brand;
    private BigDecimal price;
    private int inventory;
    private String description;
    private Category_medicine category;
    private List<MedicineImageDto> medicine_images;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public int getInventory() {
        return inventory;
    }

    public void setInventory(int inventory) {
        this.inventory = inventory;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Category_medicine getCategory() {
        return category;
    }

    public void setCategory(Category_medicine category) {
        this.category = category;
    }

    public List<MedicineImageDto> getMedicine_images() {
        return medicine_images;
    }

    public void setMedicine_images(List<MedicineImageDto> medicine_images) {
        this.medicine_images = medicine_images;
    }
}
