package com.dailycodework.dreamshops.service.blood;

import com.dailycodework.dreamshops.model.Donor;
import com.dailycodework.dreamshops.model.Notification;
import com.dailycodework.dreamshops.model.UrgentDonor;
import com.dailycodework.dreamshops.repository.DonorRepository;
import com.dailycodework.dreamshops.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.sql.Time;
import java.time.LocalDateTime;
import java.util.List;
@Service
public class NotificationService implements  INotificationService{

    private final NotificationRepository notificationRepository;
    private final DonorRepository donorRepository;  // Repository for fetching all donors

    @Autowired
    public NotificationService(NotificationRepository notificationRepository, DonorRepository donorRepository) {
        this.notificationRepository = notificationRepository;
        this.donorRepository = donorRepository;
    }

//     public List<Notification> findNotificationsByEmail(String email) {
//         return notificationRepository.findByEmail(email);
//     }


    @Override
    public List<Notification> getNotifications(String userEmail) {
//        return notificationRepository.findByUserEmail(userEmail);
        return notificationRepository.findByUserEmail(userEmail, Sort.by(Sort.Order.desc("id")));
    }


    @Override
    public Notification createNotification(String userEmail, String message) {
        Notification notification = new Notification();
        notification.setUserEmail(userEmail);
        notification.setMessage(message);
        notification.setTimestamp(LocalDateTime.now());
        return notificationRepository.save(notification);
    }

    // public void sendNotificationToAllDonors(UrgentDonor urgentDonor) {
    //     // Fetch all donors from the donors table
    //     List<Donor> allDonors = donorRepository.findAll();

    //     for (Donor donor : allDonors) {
    //         String message = String.format(
    //                 """
    //                         🚨 Urgent Blood Donation Needed! 🚨
    //                           📌 Donor Details:
    //                            Name: %sBlood Group: %s
    //                            Location: %s
    //                            Phone: %s
    //                            Email: %s
    //                         """,
    //                 urgentDonor.getName(),
    //                 urgentDonor.getBloodGroup(),
    //                 urgentDonor.getLocation(),
    //                 urgentDonor.getPhone(),
    //                 urgentDonor.getEmail()

    //         );

    //         Notification notification = new Notification();
    //         notification.setMessage(message);
    //         notification.setUserEmail(donor.getEmail());
    //         notification.setUrgentDonor(urgentDonor);
    //         notification.setDonor(donor);

    //         // Save notification in the database
    //         notificationRepository.save(notification);
    //     }
    // }




    @Override
    public void sendNotificationToAllDonors(UrgentDonor urgentDonor) {
        // Fetch all donors from the donors table
        List<Donor> allDonors = donorRepository.findAll();

        for (Donor donor : allDonors) {
//            String message = String.format(
//                "Urgent %s donor needed\n  Quantity: %d bag  \nName: %s\n  Location: %s\n  Phone: %s\n  Email: %s\n  Date: %s\n  Time: %s",
//                urgentDonor.getBloodGroup(),
//                urgentDonor.getQuantity(),
//                urgentDonor.getName(),
//                urgentDonor.getLocation(),
//                urgentDonor.getPhone(),
//                urgentDonor.getEmail(),
//                urgentDonor.getRequiredDate(),
//                urgentDonor.getRequiredTime()
//            );

            String message = String.format(
                    "Urgent %d bag \n\n" +
                            "📦 %s Blood Needed\n" +
                            "👤 Name: %s\n" +
                            "📍 Location: %s\n" +
                            "📞 Phone: %s\n" +
                            "📧 Email: %s\n" +
                            "📅 Date: %s\n" +
                            "⏰ Time: %s (24 Hour Format)",
                    urgentDonor.getQuantity(),
                    urgentDonor.getBloodGroup(),
                    urgentDonor.getName(),
                    urgentDonor.getLocation(),
                    urgentDonor.getPhone(),
                    urgentDonor.getEmail(),
                    urgentDonor.getRequiredDate(),
                    urgentDonor.getRequiredTime()
            );


            Notification notification = new Notification();
            notification.setMessage(message);
            notification.setUserEmail(donor.getEmail());
            notification.setUrgentDonor(urgentDonor);
            notification.setDonor(donor);

            // Save notification in the database
            notificationRepository.save(notification);
        }        
    }

}
