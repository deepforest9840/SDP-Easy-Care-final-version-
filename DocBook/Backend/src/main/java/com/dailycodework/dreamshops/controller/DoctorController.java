package com.dailycodework.dreamshops.controller;


import com.dailycodework.dreamshops.dto.DoctorDto;
import com.dailycodework.dreamshops.exceptions.ResourceNotFoundException;
import com.dailycodework.dreamshops.model.Doctor;
import com.dailycodework.dreamshops.request.AddDoctorRequest;
import com.dailycodework.dreamshops.request.DoctorUpdateRequest;
import com.dailycodework.dreamshops.response.ApiResponse;
import com.dailycodework.dreamshops.service.doctor.IDoctorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR;
import static org.springframework.http.HttpStatus.NOT_FOUND;

@RequiredArgsConstructor
@RestController
@RequestMapping("${api.prefix}/doctors")
public class DoctorController {

    private final IDoctorService doctorService;
    

    @GetMapping("/all")
    public ResponseEntity<ApiResponse> getAllDoctors() {
        List<Doctor> doctors = doctorService.getAllDoctors();

        List<DoctorDto> convertedDoctors = doctorService.getConvertedDoctors(doctors);

        return ResponseEntity.ok(new ApiResponse("success", convertedDoctors));
    }

   
    @GetMapping("doctor/{doctorId}/doctor")
    public ResponseEntity<ApiResponse> getDoctorById(@PathVariable Long doctorId) {
        try {
            Doctor doctor = doctorService.getDoctorById(doctorId);
            DoctorDto doctorDto = doctorService.convertToDto(doctor);

            return ResponseEntity.ok(new ApiResponse("success", doctorDto));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(NOT_FOUND).body(new ApiResponse(e.getMessage(), null));
        }
    }

    @PostMapping("/add")
    public ResponseEntity<ApiResponse> addDoctor(@RequestBody AddDoctorRequest doctor) {
        try {
            Doctor theDoctor = doctorService.addDoctor(doctor);

            return ResponseEntity.ok(new ApiResponse("Add doctor success!", theDoctor));
        } catch (Exception e) {
            return ResponseEntity.status(INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage(), null));
        }
    }

    @PutMapping("/doctor/{doctorId}/update")
    public ResponseEntity<ApiResponse> updateDoctor(@RequestBody DoctorUpdateRequest request, @PathVariable Long doctorId) {
        try {
            Doctor theDoctor = doctorService.updateDoctor(request, doctorId);

            return ResponseEntity.ok(new ApiResponse("Update doctor success!", theDoctor));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(NOT_FOUND).body(new ApiResponse(e.getMessage(), null));
        }
    }

    @DeleteMapping("/doctor/{doctorId}/delete")
    public ResponseEntity<ApiResponse> deleteDoctor(@PathVariable Long doctorId) {
        try {
            doctorService.deleteDoctorById(doctorId);
            return ResponseEntity.ok(new ApiResponse("Delete doctor success!", doctorId));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(NOT_FOUND).body(new ApiResponse(e.getMessage(), null));
        }
    }
//
//    @GetMapping("/doctors/by/brand-and-name")
//    public ResponseEntity<ApiResponse> getDoctorByBrandAndName(@RequestParam String brandName, @RequestParam String doctorName) {
//        try {
//            List<Doctor> doctors = doctorService.getDoctorsByBrandAndName(brandName, doctorName);
//
//            if (doctors.isEmpty()) {
//                return ResponseEntity.status(NOT_FOUND).body(new ApiResponse("No doctors found", null));
//            }
//            List<DoctorDto> convertedDoctors = doctorService.getConvertedDoctors(doctors);
//            return ResponseEntity.ok(new ApiResponse("success", convertedDoctors));
//        } catch (Exception e) {
//            return ResponseEntity.status(INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage(), null));
//        }
//    }
//
//    @GetMapping("/doctors/by/category-and-brand")
//    public ResponseEntity<ApiResponse> getDoctorByCategoryAndBrand(@RequestParam String category, @RequestParam String brand) {
//        try {
//            List<Doctor> doctors = doctorService.getDoctorsByCategoryAndBrand(category, brand);
//
//            if (doctors.isEmpty()) {
//                return ResponseEntity.status(NOT_FOUND).body(new ApiResponse("No doctors found", null));
//            }
//            List<DoctorDto> convertedDoctors = doctorService.getConvertedDoctors(doctors);
//            return ResponseEntity.ok(new ApiResponse("success", convertedDoctors));
//        } catch (Exception e) {
//            return ResponseEntity.status(INTERNAL_SERVER_ERROR).body(new ApiResponse("error", e.getMessage()));
//        }
//    }

    @GetMapping("/doctors/{name}/doctors")
    public ResponseEntity<ApiResponse> getDoctorByName(@PathVariable String name) {
        try {
            List<Doctor> doctors = doctorService.getDoctorsByName(name);

            if (doctors.isEmpty()) {
                return ResponseEntity.status(NOT_FOUND).body(new ApiResponse("No doctors found", null));
            }
            List<DoctorDto> convertedDoctors = doctorService.getConvertedDoctors(doctors);
            return ResponseEntity.ok(new ApiResponse("success", convertedDoctors));
        } catch (Exception e) {
            return ResponseEntity.status(INTERNAL_SERVER_ERROR).body(new ApiResponse("error", e.getMessage()));
        }
    }
//
//    @GetMapping("/doctor/by-brand")
//    public ResponseEntity<ApiResponse> findDoctorByBrand(@RequestParam String brand) {
//        try {
//            List<Doctor> doctors = doctorService.getDoctorsByBrand(brand);
//            if (doctors.isEmpty()) {
//                return ResponseEntity.status(NOT_FOUND).body(new ApiResponse("No doctors found", null));
//            }
//            List<DoctorDto> convertedDoctors = doctorService.getConvertedDoctors(doctors);
//            return ResponseEntity.ok(new ApiResponse("success", convertedDoctors));
//        } catch (Exception e) {
//            return ResponseEntity.ok(new ApiResponse(e.getMessage(), null));
//        }
//    }

    @GetMapping("/doctor/{category}/all/doctors")
    public ResponseEntity<ApiResponse> findDoctorByCategory(@PathVariable String category) {
        try {
            List<Doctor> doctors = doctorService.getDoctorsByCategory(category);
            if (doctors.isEmpty()) {
                return ResponseEntity.status(NOT_FOUND).body(new ApiResponse("No doctors found", null));
            }
            List<DoctorDto> convertedDoctors = doctorService.getConvertedDoctors(doctors);
            return ResponseEntity.ok(new ApiResponse("success", convertedDoctors));
        } catch (Exception e) {
            return ResponseEntity.ok(new ApiResponse(e.getMessage(), null));
        }
    }

//    @GetMapping("/doctor/count/by-brand/and-name")
//    public ResponseEntity<ApiResponse> countDoctorsByBrandAndName(@RequestParam String brand, @RequestParam String name) {
//        try {
//            var doctorCount = doctorService.countDoctorsByBrandAndName(brand, name);
//            return ResponseEntity.ok(new ApiResponse("Doctor count!", doctorCount));
//        } catch (Exception e) {
//            return ResponseEntity.ok(new ApiResponse(e.getMessage(), null));
//        }
//    }

    @GetMapping("/doctor/next-id")
    public ResponseEntity<ApiResponse> getNextDoctorId() {
        try {
            Long nextDoctorId = doctorService.getNextDoctorId();
            return ResponseEntity.ok(new ApiResponse("Success", nextDoctorId));
        } catch (Exception e) {
            return ResponseEntity.status(INTERNAL_SERVER_ERROR).body(new ApiResponse("Error fetching next doctor ID", null));
        }
    }


    @PostMapping("/{doctorId}/calculate-rating")
    public double calculateDoctorRating(@PathVariable Long doctorId, @RequestParam double rate) {
        return doctorService.calculateDoctorRating(doctorId, rate);
    }

    // Endpoint to fetch the current rating
    @GetMapping("/{doctorId}/rating")
    public double getDoctorRating(@PathVariable Long doctorId) {
        return doctorService.getDoctorRating(doctorId);
    }

   
}
