package com.dailycodework.dreamshops.repository;

import com.dailycodework.dreamshops.model.Doctor;
import com.dailycodework.dreamshops.model.Hospital;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface HospitalRepository extends JpaRepository<Hospital, Long> {

    // Search for hospitals by name (longest string match)
    @Query("SELECT h FROM Hospital h WHERE LOWER(h.name) LIKE LOWER(CONCAT('%', :name, '%')) " +
            "ORDER BY LENGTH(h.name) DESC")
    List<Hospital> findByNameLongestMatch(String name);

    // Search for hospitals by area (longest string match)
    @Query("SELECT h FROM Hospital h WHERE LOWER(h.area) LIKE LOWER(CONCAT('%', :area, '%')) " +
            "ORDER BY LENGTH(h.area) DESC")
    List<Hospital> findByAreaLongestMatch(String area);

    @Query("SELECT h.id FROM Hospital h WHERE LOWER(h.name) = LOWER(:name) AND LOWER(h.area) = LOWER(:area)")
    Optional<Long> findIdByNameIgnoreCaseAndAreaIgnoreCase(String name, String area);
    
    @Query("SELECT h FROM Hospital h WHERE h.id = :id")
    Optional<Hospital> findHospitalNameAndAreaById(Long id);
    

}
