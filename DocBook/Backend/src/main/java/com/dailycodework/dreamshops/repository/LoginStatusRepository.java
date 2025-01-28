package com.dailycodework.dreamshops.repository;

import com.dailycodework.dreamshops.dto.LoginStatusDto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LoginStatusRepository extends JpaRepository<LoginStatusDto , Long> {
    
}
