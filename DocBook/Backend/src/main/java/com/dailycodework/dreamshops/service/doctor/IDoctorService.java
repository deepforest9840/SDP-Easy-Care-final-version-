package com.dailycodework.dreamshops.service.doctor;

import com.dailycodework.dreamshops.dto.DoctorDto;
import com.dailycodework.dreamshops.model.Doctor;
import com.dailycodework.dreamshops.request.AddDoctorRequest;
import com.dailycodework.dreamshops.request.DoctorUpdateRequest;

import java.util.List;

public interface IDoctorService {

    Doctor addDoctor(AddDoctorRequest doctor);
    Doctor getDoctorById(Long id);
    Doctor getDoctorByEmail(String email) ;
    void deleteDoctorById(Long id);

    Long getNextDoctorId();

    Doctor updateDoctor(DoctorUpdateRequest doctor, Long doctorId);
    List<Doctor> getAllDoctors();
    List<Doctor> getDoctorsByCategory(String category);
   // List<Doctor> getDoctorsByBrand(String brand);
   // List<Doctor> getDoctorsByCategoryAndBrand(String category, String brand);
    List<Doctor> getDoctorsByName(String name);
   // List<Doctor> getDoctorsByBrandAndName(String brand, String name);
   // Long countDoctorsByBrandAndName(String brand, String name);

    List<DoctorDto> getConvertedDoctors(List<Doctor> doctors);

    DoctorDto convertToDto(Doctor doctor);



    // Increment the number of patients for a doctor
    void addNoOfPatients(Long doctorId);

    // Calculate the rating of a doctor dynamically
    double calculateDoctorRating(Long doctorId,double rate);

public double getDoctorRating(Long doctorId) ;

}
