package com.dailycodework.dreamshops.repository;

import com.dailycodework.dreamshops.model.Category_medicine;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MedicineCategoryRepository extends JpaRepository<Category_medicine, Long> {
  Category_medicine findByName(String name);

  boolean existsByName(String name);
}
