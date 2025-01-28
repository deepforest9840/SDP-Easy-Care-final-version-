package com.dailycodework.dreamshops.service.medicine_image;

import com.dailycodework.dreamshops.dto.MedicineImageDto;
import com.dailycodework.dreamshops.model.Image_medicine;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface MedicineIImageService {
    Image_medicine getImageById(Long id);
    void deleteImageById(Long id);
    List<MedicineImageDto> saveImages(Long productId, List<MultipartFile> files);
    void updateImage(MultipartFile file,  Long imageId);
}
