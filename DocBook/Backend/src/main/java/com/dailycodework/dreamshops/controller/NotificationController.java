package com.dailycodework.dreamshops.controller;

import com.dailycodework.dreamshops.model.Notification;
import com.dailycodework.dreamshops.service.blood.INotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    @Autowired
    private INotificationService notificationService;

    @GetMapping
    public List<Notification> getNotifications(@RequestParam String email) {
        return notificationService.getNotifications(email);
    }

    @PostMapping
    public Notification createNotification(@RequestParam String email, @RequestParam String message) {
        return notificationService.createNotification(email, message);
    }
}
