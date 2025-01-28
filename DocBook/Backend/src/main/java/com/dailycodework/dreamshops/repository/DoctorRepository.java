package com.dailycodework.dreamshops.repository;

import com.dailycodework.dreamshops.model.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DoctorRepository extends JpaRepository<Doctor,Long> {

    @Query("SELECT MAX(p.id) FROM Doctor p")
    Long findMaxDoctorId();
   
    List<Doctor> findByCategoryName(String category);

  //  List<Doctor> findByBrand(String brand);

  //  List<Doctor> findByCategoryNameAndBrand(String category, String brand);

    List<Doctor> findByName(String name);
    Doctor findById(long doctorId);
    Doctor findByGmail(String email) ;
    boolean existsByGmail(String gmail);

   // List<Doctor> findByBrandAndName(String brand, String name);

   // Long countByBrandAndName(String brand, String name);
}
