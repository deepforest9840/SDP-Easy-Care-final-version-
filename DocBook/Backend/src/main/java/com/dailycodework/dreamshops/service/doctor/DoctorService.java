package com.dailycodework.dreamshops.service.doctor;

import com.dailycodework.dreamshops.dto.ImageDto;
import com.dailycodework.dreamshops.dto.DoctorDto;
import com.dailycodework.dreamshops.exceptions.AlreadyExistsException;
import com.dailycodework.dreamshops.exceptions.ResourceNotFoundException;
import com.dailycodework.dreamshops.model.Category;
import com.dailycodework.dreamshops.model.Image;
import com.dailycodework.dreamshops.model.Doctor;
import com.dailycodework.dreamshops.repository.CategoryRepository;
import com.dailycodework.dreamshops.repository.ImageRepository;
import com.dailycodework.dreamshops.repository.DoctorRepository;
import com.dailycodework.dreamshops.request.AddDoctorRequest;
import com.dailycodework.dreamshops.request.DoctorUpdateRequest;
import lombok.RequiredArgsConstructor;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DoctorService implements IDoctorService {
    private final DoctorRepository doctorRepository;
    private final CategoryRepository categoryRepository;

    private final ImageRepository imageRepository;

    private final ModelMapper modelMapper;

 @Override
public Doctor addDoctor(AddDoctorRequest request) {
    // Check if the category is found in the DB
    Category category = categoryRepository.findByName(request.getCategory().getName())
            .orElseGet(() -> {
                Category newCategory = new Category(request.getCategory().getName());
                return categoryRepository.save(newCategory);
            });

    // Check if the email already exists in the database
    if (doctorRepository.existsByGmail(request.getGmail())) {
        throw new AlreadyExistsException("Doctor with the email '" + request.getGmail() + "' already exists.");
    }

    request.setCategory(category);
    return doctorRepository.save(createDoctor(request, category));
}


    private Doctor createDoctor(AddDoctorRequest request, Category category) {
        return new Doctor(
                request.getGmail(),
                request.getName(),
                request.getHospitalName(),
                request.getDescription(),
                request.getExperience(),
               
                request.getStatus(),
                category
        );
    }

    @Override
    public Doctor getDoctorById(Long id) {
        return doctorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Doctor not found!"));
    }
    @Override
    public Doctor getDoctorByEmail(String email)
    {
        return doctorRepository.findByGmail(email) ;
                
    }

    @Override
    public void deleteDoctorById(Long id) {
        doctorRepository.findById(id).ifPresentOrElse(doctor -> {
            // Log to verify the doctor exists
            System.out.println("Deleting doctor: " + doctor);
            doctorRepository.delete(doctor);
        }, () -> {
            throw new ResourceNotFoundException("Doctor not found with ID: " + id);
        });
    }

    @Override
    public Long getNextDoctorId() {
        Long nextId = doctorRepository.findMaxDoctorId();
        return nextId != null ? nextId + 1 : 1L; // If no doctors exist, return 1L
    }

    // @Override
    // public Doctor updateDoctor(DoctorUpdateRequest request, Long doctorId) {
    //     return doctorRepository.findById(doctorId)
    //             .map(existingDoctor -> updateExistingDoctor(existingDoctor, request))
    //             .map(doctorRepository::save)
    //             .orElseThrow(() -> new ResourceNotFoundException("Doctor not found!"));
    // }

    // private Doctor updateExistingDoctor(Doctor existingDoctor, DoctorUpdateRequest request) {
    //     existingDoctor.setGmail(request.getGmail());
    //     existingDoctor.setName(request.getName());
    //     existingDoctor.setHospitalName(request.getHospitalName());
    //     existingDoctor.setDescription(request.getDescription());
    //     existingDoctor.setExperience(request.getExperience());
        
    //     existingDoctor.setStatus(request.getStatus());
    //     Category category = categoryRepository.findByName(request.getCategory().getName());
    //     existingDoctor.setCategory(category);
    //     return existingDoctor;
    // }

    @Override
public Doctor updateDoctor(DoctorUpdateRequest request, Long doctorId) {
    Doctor existingDoctor = doctorRepository.findById(doctorId)
            .orElseThrow(() -> new ResourceNotFoundException("Doctor not found with ID: " + doctorId));

    // Updated to use Optional<Category>
    Category category = categoryRepository.findByName(request.getCategory().getName())
            .orElseThrow(() -> new ResourceNotFoundException("Category not found with name: " + request.getCategory().getName()));

    
    existingDoctor.setName(request.getName());
    existingDoctor.setHospitalName(request.getHospitalName());
    existingDoctor.setDescription(request.getDescription());
    existingDoctor.setExperience(request.getExperience());
    existingDoctor.setStatus(request.getStatus());
    existingDoctor.setCategory(category);

    return doctorRepository.save(existingDoctor);
}


    @Override
    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    @Override
    public List<Doctor> getDoctorsByCategory(String category) {
        return doctorRepository.findByCategoryName(category);
    }
//
//    @Override
//    public List<Doctor> getDoctorsByBrand(String brand) {
//        return doctorRepository.findByBrand(brand);
//    }
//
//    @Override
//    public List<Doctor> getDoctorsByCategoryAndBrand(String category, String brand) {
//        return doctorRepository.findByCategoryNameAndBrand(category, brand);
//    }
//
    @Override
    public List<Doctor> getDoctorsByName(String name) {
        return doctorRepository.findByName(name);
    }

//    @Override
//    public List<Doctor> getDoctorsByBrandAndName(String brand, String name) {
//        return doctorRepository.findByBrandAndName(brand, name);
//    }

//    @Override
//    public Long countDoctorsByBrandAndName(String brand, String name) {
//        return doctorRepository.countByBrandAndName(brand, name);
//    }

    @Override
    public List<DoctorDto> getConvertedDoctors(List<Doctor> doctors) {
        return doctors.stream().map(this::convertToDto).toList();
    }

    @Override
    public DoctorDto convertToDto(Doctor doctor) {
        DoctorDto doctorDto = modelMapper.map(doctor, DoctorDto.class);
        List<Image> images = imageRepository.findByDoctorId(doctor.getId());

        List<ImageDto> imageDtos = images.stream().map(image -> modelMapper.map(image, ImageDto.class)).toList();

        doctorDto.setImages(imageDtos);
        return doctorDto;
    }










 // Increment the number of patients for a doctor
 public void addNoOfPatients(Long doctorId) {
    Doctor doctor = doctorRepository.findById(doctorId)
            .orElseThrow(() -> new RuntimeException("Doctor not found with ID: " + doctorId));

    int currentNoOfPatients = doctor.getNoOfPatients();
    doctor.setNoOfPatients(currentNoOfPatients + 1);
    doctorRepository.save(doctor); // Save the updated doctor
}

// Calculate the rating of a doctor dynamically
public double calculateDoctorRating(Long doctorId, double rate) {
    Doctor doctor = doctorRepository.findById(doctorId)
            .orElseThrow(() -> new RuntimeException("Doctor not found with ID: " + doctorId));

    int noOfPatients = doctor.getNoOfPatients()+1;
    if (noOfPatients>5)
        {noOfPatients=5;}
    double newRating = doctor.getRating() + (rate / noOfPatients);

    doctor.setRating(newRating); // Update the rating field
    doctorRepository.save(doctor); // Save the updated doctor

    return newRating; // Return the updated rating
}


public double getDoctorRating(Long doctorId) {
    Doctor doctor = doctorRepository.findById(doctorId)
            .orElseThrow(() -> new RuntimeException("Doctor not found with ID: " + doctorId));

    return doctor.getRating(); // Return the current rating
}










}
