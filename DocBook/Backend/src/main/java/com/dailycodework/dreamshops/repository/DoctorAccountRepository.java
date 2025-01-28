package com.dailycodework.dreamshops.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.dailycodework.dreamshops.model.User;
import com.dailycodework.dreamshops.model.DoctorAccount;

import jakarta.transaction.Transactional;

public interface DoctorAccountRepository extends JpaRepository<DoctorAccount , Long>  {
    DoctorAccount findDoctorAccountByEmail(String email) ; 
    
    @Modifying
    @Transactional
    @Query("UPDATE DoctorAccount  u SET u.loginStatus = :loginStatus WHERE u.email = :email")
    int updateDoctorAccountLoginStatus(@Param("loginStatus") String loginStatus, @Param("email") String email); 
}
