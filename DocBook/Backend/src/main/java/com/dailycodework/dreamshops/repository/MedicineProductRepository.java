package com.dailycodework.dreamshops.repository;

import com.dailycodework.dreamshops.model.Product_medicine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MedicineProductRepository extends JpaRepository<Product_medicine, Long> {
    List<Product_medicine> findByCategoryName(String category);

    @Query("SELECT MAX(p.id) FROM Product_medicine p")
    Long findMaxProductId();
    List<Product_medicine> findByBrand(String brand);

    List<Product_medicine> findByCategoryNameAndBrand(String category, String brand);

    List<Product_medicine> findByName(String name);

    List<Product_medicine> findByBrandAndName(String brand, String name);

    Long countByBrandAndName(String brand, String name);
}
