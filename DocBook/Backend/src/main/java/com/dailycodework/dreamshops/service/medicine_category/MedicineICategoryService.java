package com.dailycodework.dreamshops.service.medicine_category;

import com.dailycodework.dreamshops.model.Category_medicine;

import java.util.List;

public interface MedicineICategoryService {
    Category_medicine getCategoryById(Long id);
    Category_medicine getCategoryByName(String name);
    List<Category_medicine> getAllCategories();
    Category_medicine addCategory(Category_medicine category);
    Category_medicine updateCategory(Category_medicine category, Long id);
    void deleteCategoryById(Long id);

}
