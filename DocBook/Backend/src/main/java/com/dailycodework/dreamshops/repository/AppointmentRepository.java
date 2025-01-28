package com.dailycodework.dreamshops.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.Modifying;

import com.dailycodework.dreamshops.model.Appointment;

import jakarta.transaction.Transactional;



public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    List<Appointment> findAppointmentsByEmail(String email) ;// for user only
    List<Appointment> findAppointmentsByDoctorId(Long id) ;

    //
    @Modifying
    @Transactional
    @Query("UPDATE Appointment a SET a.status = :status WHERE a.id = :id")
    void updateAppointmentStatus(@Param("id") Long id, @Param("status") String status);
       
}
