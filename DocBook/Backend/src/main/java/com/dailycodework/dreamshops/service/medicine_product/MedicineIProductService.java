package com.dailycodework.dreamshops.service.medicine_product;

import com.dailycodework.dreamshops.dto.MedicineProductDto;
import com.dailycodework.dreamshops.model.Product_medicine;
import com.dailycodework.dreamshops.request.AddProductRequest;
import com.dailycodework.dreamshops.request.ProductUpdateRequest;

import java.util.List;

public interface MedicineIProductService {
    Product_medicine addProduct(AddProductRequest product);

    Long getNextProductId();
    Product_medicine getProductById(Long id);
    void deleteProductById(Long id);
    Product_medicine updateProduct(ProductUpdateRequest product, Long productId);
    List<Product_medicine> getAllProducts();
    List<Product_medicine> getProductsByCategory(String category);
    List<Product_medicine> getProductsByBrand(String brand);
    List<Product_medicine> getProductsByCategoryAndBrand(String category, String brand);
    List<Product_medicine> getProductsByName(String name);
    List<Product_medicine> getProductsByBrandAndName(String category, String name);
    Long countProductsByBrandAndName(String brand, String name);

    List<MedicineProductDto> getConvertedProducts(List<Product_medicine> products);

    MedicineProductDto convertToDto(Product_medicine product);
}
