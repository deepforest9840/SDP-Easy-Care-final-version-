package com.dailycodework.dreamshops.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.dailycodework.dreamshops.model.User;

import jakarta.transaction.Transactional;

public interface UserRepository extends JpaRepository<User, Long>  {
    User findUserByEmail(String email) ; 
    
    @Modifying
    @Transactional
    @Query("UPDATE User u SET u.loginStatus = :loginStatus WHERE u.email = :email")
    int updateUserLoginStatus(@Param("loginStatus") String loginStatus, @Param("email") String email); 
}
