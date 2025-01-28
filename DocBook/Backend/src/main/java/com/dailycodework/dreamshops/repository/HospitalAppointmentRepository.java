package com.dailycodework.dreamshops.repository;



import  com.dailycodework.dreamshops.model.HospitalAppointment; 
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface HospitalAppointmentRepository extends JpaRepository<HospitalAppointment, Long> {

    // Query to get hospital stats (distinct name with their total sum)
    @Query("SELECT h.name, SUM(h.noOfPatient) FROM HospitalAppointment h GROUP BY h.name")
    List<Object[]> getHospitalStats();

    // Query to get sum for distinct areas for a given name
    @Query("SELECT h.area, SUM(h.noOfPatient) FROM HospitalAppointment h WHERE h.name = :name GROUP BY h.area")
    List<Object[]> getAreaStatsByName(String name);

    @Query("SELECT h.name, SUM(h.noOfPatient) FROM HospitalAppointment h WHERE h.area = :area GROUP BY h.name")
List<Object[]> getHospitalStatsByArea(String area);

}

