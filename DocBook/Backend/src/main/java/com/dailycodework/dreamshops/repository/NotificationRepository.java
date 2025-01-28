package com.dailycodework.dreamshops.repository;

import com.dailycodework.dreamshops.model.Notification;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
//    List<Notification> findByUserEmail(String userEmail);
    List<Notification> findByUserEmail(String userEmail, Sort sort);
    List<Notification> findByUrgentDonorId(Long urgentDonorId);

}
