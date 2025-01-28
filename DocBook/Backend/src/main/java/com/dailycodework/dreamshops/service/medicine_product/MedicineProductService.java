package com.dailycodework.dreamshops.service.medicine_product;

import com.dailycodework.dreamshops.dto.MedicineImageDto;
import com.dailycodework.dreamshops.dto.MedicineProductDto;
import com.dailycodework.dreamshops.exceptions.ResourceNotFoundException;
import com.dailycodework.dreamshops.model.Category_medicine;
import com.dailycodework.dreamshops.model.Image_medicine;
import com.dailycodework.dreamshops.model.Product_medicine;
import com.dailycodework.dreamshops.repository.MedicineCategoryRepository;
import com.dailycodework.dreamshops.repository.MedicineImageRepository;
import com.dailycodework.dreamshops.repository.MedicineProductRepository;
import com.dailycodework.dreamshops.request.AddProductRequest;
import com.dailycodework.dreamshops.request.ProductUpdateRequest;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MedicineProductService implements MedicineIProductService {
    private final MedicineProductRepository productRepository;
    private final MedicineCategoryRepository categoryRepository;
    private final ModelMapper modelMapper;
    private final MedicineImageRepository imageRepository;

    @Override
    public Product_medicine addProduct(AddProductRequest request) {
        // check if the category is found in the DB
        // If Yes, set it as the new product category
        // If No, the save it as a new category
        // The set as the new product category.

        Category_medicine category = Optional.ofNullable(categoryRepository.findByName(request.getCategory().getName()))
                .orElseGet(() -> {
                    Category_medicine newCategory = new Category_medicine(request.getCategory().getName());
                    return categoryRepository.save(newCategory);
                });
        request.setCategory(category);
        return productRepository.save(createProduct(request, category));
    }

    private Product_medicine createProduct(AddProductRequest request, Category_medicine category) {
        return new Product_medicine(
                request.getName(),
                request.getBrand(),
                request.getPrice(),
                request.getInventory(),
                request.getDescription(),
                category
        );
    }


    @Override
    public Product_medicine getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Product not found!"));
    }

    @Override
    public void deleteProductById(Long id) {
        productRepository.findById(id)
                .ifPresentOrElse(productRepository::delete,
                        () -> {throw new ResourceNotFoundException("Product not found!");});
    }

    @Override
    public Product_medicine updateProduct(ProductUpdateRequest request, Long productId) {
        return productRepository.findById(productId)
                .map(existingProduct -> updateExistingProduct(existingProduct,request))
                .map(productRepository :: save)
                .orElseThrow(()-> new ResourceNotFoundException("Product not found!"));
    }

    private Product_medicine updateExistingProduct(Product_medicine existingProduct, ProductUpdateRequest request) {
        existingProduct.setName(request.getName());
        existingProduct.setBrand(request.getBrand());
        existingProduct.setPrice(request.getPrice());
        existingProduct.setInventory(request.getInventory());
        existingProduct.setDescription(request.getDescription());

        Category_medicine category = categoryRepository.findByName(request.getCategory().getName());
        existingProduct.setCategory(category);
        return  existingProduct;

    }

    @Override
    public List<Product_medicine> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public List<Product_medicine> getProductsByCategory(String category) {
        return productRepository.findByCategoryName(category);
    }

    @Override
    public List<Product_medicine> getProductsByBrand(String brand) {
        return productRepository.findByBrand(brand);
    }

    @Override
    public List<Product_medicine> getProductsByCategoryAndBrand(String category, String brand) {
        return productRepository.findByCategoryNameAndBrand(category, brand);
    }

    @Override
    public List<Product_medicine> getProductsByName(String name) {
        return productRepository.findByName(name);
    }

    @Override
    public List<Product_medicine> getProductsByBrandAndName(String brand, String name) {
        return productRepository.findByBrandAndName(brand, name);
    }

    @Override
    public Long countProductsByBrandAndName(String brand, String name) {
        return productRepository.countByBrandAndName(brand, name);
    }

    @Override
    public List<MedicineProductDto> getConvertedProducts(List<Product_medicine> products) {
      return products.stream().map(this::convertToDto).toList();
    }

    @Override
    public MedicineProductDto convertToDto(Product_medicine product) {
        MedicineProductDto productDto = modelMapper.map(product, MedicineProductDto.class);
        List<Image_medicine> images = imageRepository.findByProductId(product.getId());
        List<MedicineImageDto> imageDtos = images.stream()
                .map(image -> modelMapper.map(image, MedicineImageDto.class))
                .toList();
        productDto.setMedicine_images(imageDtos);
        return productDto;
    }


    public Long getNextProductId() {
        Long nextId = productRepository.findMaxProductId();
        return nextId != null ? nextId + 1 : 1L; // If no doctors exist, return 1L
    }









}
