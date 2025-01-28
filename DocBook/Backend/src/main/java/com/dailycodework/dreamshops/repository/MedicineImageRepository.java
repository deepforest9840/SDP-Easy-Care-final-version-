package com.dailycodework.dreamshops.repository;

import com.dailycodework.dreamshops.model.Image_medicine;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MedicineImageRepository extends JpaRepository<Image_medicine, Long> {
    List<Image_medicine> findByProductId(Long id);
}
