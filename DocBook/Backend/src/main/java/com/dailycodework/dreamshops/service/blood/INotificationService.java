package com.dailycodework.dreamshops.service.blood;

import com.dailycodework.dreamshops.model.Notification;
import com.dailycodework.dreamshops.model.UrgentDonor;

import java.util.List;

public interface INotificationService {
    List<Notification> getNotifications(String userEmail);

    
    Notification createNotification(String userEmail, String message);

  
    void sendNotificationToAllDonors(UrgentDonor urgentDonor);
}
