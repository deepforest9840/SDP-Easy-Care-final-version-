package com.dailycodework.dreamshops.repository;

import com.dailycodework.dreamshops.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional; // Ensure this import is added

public interface CategoryRepository extends JpaRepository<Category, Long> {
    Optional<Category> findByName(String name); // Changed to return Optional
    boolean existsByName(String name);
}
