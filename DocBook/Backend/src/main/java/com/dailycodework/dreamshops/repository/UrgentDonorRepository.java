package com.dailycodework.dreamshops.repository;

import com.dailycodework.dreamshops.model.UrgentDonor;
import com.dailycodework.dreamshops.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UrgentDonorRepository extends JpaRepository<UrgentDonor, Long> {
    List<UrgentDonor> findByBloodGroupIgnoreCase(String bloodGroup);
    List<UrgentDonor> findByLocationContainingIgnoreCase(String location);
    List<UrgentDonor> findByBloodGroupIgnoreCaseAndLocationContainingIgnoreCase(String bloodGroup, String location);
    boolean existsByUser(User user);


}