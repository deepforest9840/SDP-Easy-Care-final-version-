package com.dailycodework.dreamshops.service.medicine_image;

import com.dailycodework.dreamshops.dto.MedicineImageDto;
import com.dailycodework.dreamshops.exceptions.ResourceNotFoundException;
import com.dailycodework.dreamshops.model.Image_medicine;
import com.dailycodework.dreamshops.model.Product_medicine;
import com.dailycodework.dreamshops.repository.MedicineImageRepository;
import com.dailycodework.dreamshops.service.medicine_product.MedicineIProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.sql.rowset.serial.SerialBlob;
import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MedicineImageService implements MedicineIImageService {
    private final MedicineImageRepository imageRepository;
    private final MedicineIProductService productService;


    @Override
    public Image_medicine getImageById(Long id) {
        return imageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("No image found with id: " + id));
    }

    @Override
    public void deleteImageById(Long id) {
        imageRepository.findById(id).ifPresentOrElse(imageRepository::delete, () -> {
            throw new ResourceNotFoundException("No image found with id: " + id);
        });

    }

    @Override
    public List<MedicineImageDto> saveImages(Long productId, List<MultipartFile> files) {
        Product_medicine product = productService.getProductById(productId);

        List<MedicineImageDto> savedImageDto = new ArrayList<>();
        for (MultipartFile file : files) {
            try {
                Image_medicine image = new Image_medicine();
                image.setFileName(file.getOriginalFilename());
                image.setFileType(file.getContentType());
                image.setImage(new SerialBlob(file.getBytes()));
                image.setProduct(product);

                String buildDownloadUrl = "/api/v1/medicine_images/image/download/";
                String downloadUrl = buildDownloadUrl+image.getId();
                image.setDownloadUrl(downloadUrl);
               Image_medicine savedImage = imageRepository.save(image);

               savedImage.setDownloadUrl(buildDownloadUrl+savedImage.getId());
               imageRepository.save(savedImage);

               MedicineImageDto imageDto = new MedicineImageDto();
               imageDto.setId(savedImage.getId());
               imageDto.setFileName(savedImage.getFileName());
               imageDto.setDownloadUrl(savedImage.getDownloadUrl());
               savedImageDto.add(imageDto);

            }   catch(IOException | SQLException e){
                throw new RuntimeException(e.getMessage());
            }
        }
        return savedImageDto;
    }

    

    @Override
    public void updateImage(MultipartFile file, Long imageId) {
        Image_medicine image = getImageById(imageId);
        try {
            image.setFileName(file.getOriginalFilename());
            image.setFileType(file.getContentType());
            image.setImage(new SerialBlob(file.getBytes()));
            imageRepository.save(image);
        } catch (IOException | SQLException e) {
            throw new RuntimeException(e.getMessage());
        }

    }
}
