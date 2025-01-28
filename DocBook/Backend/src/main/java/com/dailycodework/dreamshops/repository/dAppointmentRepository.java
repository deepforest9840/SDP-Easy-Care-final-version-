package com.dailycodework.dreamshops.repository;

import com.dailycodework.dreamshops.model.dAppointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public interface dAppointmentRepository extends JpaRepository<dAppointment, Long> {

    // Find appointments by hospital ID
    List<dAppointment> findByHospitalId(Long hospitalId);


    // dAppointmentRepository.java

// Query to fetch appointments by a list of doctor IDs
@Query("SELECT a FROM dAppointment a WHERE a.doctorId IN :doctorId")
List<dAppointment> findAppointmentsByDoctorId(@Param("doctorId") List<Long> doctorId);

   // Get all appointments by hospital area
   
   @Query("SELECT h.id FROM Hospital h WHERE h.area = :area")
   List<Long> findHospitalIdsByArea(String area);

    // Get all appointments before a certain time
    List<dAppointment> findByTimeBefore(LocalDateTime time);




    @Query("SELECT h.id FROM Hospital h WHERE h.name = :name")
    List<Long> findHospitalIdsByName(String name);
    
    
    @Query("SELECT a FROM dAppointment a WHERE a.hospitalId IN :hospitalIds")
    List<dAppointment> findAppointmentsByHospitalIds(@Param("hospitalIds") List<Long> hospitalIds);
    


    // Existing queries for appointments based on fee, time, etc.
    @Query("SELECT a FROM dAppointment a WHERE a.fee < :fee")
    List<dAppointment> findByFeeLessThan(double fee);

    // @Query("SELECT a FROM dAppointment a WHERE a.doctor.id IN " +
    // "(SELECT d.id FROM Doctor d WHERE d.category.id = " +
    // "(SELECT c.id FROM Category c WHERE LOWER(c.name) = LOWER(:categoryName) ORDER BY LENGTH(c.name) DESC)) " +
    // "AND a.time > CURRENT_TIMESTAMP")
    // List<dAppointment> findByCategoryAndTimeGreaterThanNow(String categoryName);



}
