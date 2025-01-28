package com.dailycodework.dreamshops.repository;

import com.dailycodework.dreamshops.model.Donor;
import com.dailycodework.dreamshops.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DonorRepository extends JpaRepository<Donor, Long> {
    List<Donor> findByBloodGroupIgnoreCase(String bloodGroup);
    List<Donor> findByLocationContainingIgnoreCase(String location);
    List<Donor> findByBloodGroupIgnoreCaseAndLocationContainingIgnoreCase(String bloodGroup, String location);
    boolean existsByUser(User user);


}