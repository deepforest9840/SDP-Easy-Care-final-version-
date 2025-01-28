package com.dailycodework.dreamshops.repository;

import com.dailycodework.dreamshops.model.Prescription;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface PrescriptionRepository extends JpaRepository<Prescription, Long> {

    List<Prescription> findByAppointmentId(Long appointmentId);
    List<Prescription> findByPatientEmail(String patientEmail);

    @Modifying
    @Query("UPDATE Prescription p SET p.seenStatus = :seenStatus WHERE p.appointmentId = :id")
    void updateSeenStatus(@Param("id") Long id, @Param("seenStatus") String seenStatus);

}
