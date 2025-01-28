package com.dailycodework.dreamshops.service.blood;

import com.dailycodework.dreamshops.model.Notification;
import com.dailycodework.dreamshops.model.UrgentDonor;
import com.dailycodework.dreamshops.model.User;
import com.dailycodework.dreamshops.repository.NotificationRepository;
import com.dailycodework.dreamshops.repository.UrgentDonorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;
@Service
public class UrgentDonorService implements IUrgentDonorService{
    private final UrgentDonorRepository urgentDonorRepository;
    private final NotificationRepository notificationRepository;

    @Autowired
    public UrgentDonorService(UrgentDonorRepository urgentDonorRepository, NotificationRepository notificationRepository) {
        this.urgentDonorRepository = urgentDonorRepository;
        this.notificationRepository = notificationRepository;
    }


    @Override
    public List<UrgentDonor> getAllDonors() {
        return urgentDonorRepository.findAll();
    }


    @Override
    public List<UrgentDonor> searchDonors(String bloodGroup, String location) {
        if (bloodGroup != null && !bloodGroup.isEmpty() && location != null && !location.isEmpty()) {
            return urgentDonorRepository.findByBloodGroupIgnoreCaseAndLocationContainingIgnoreCase(bloodGroup, location);
        } else if (bloodGroup != null && !bloodGroup.isEmpty()) {
            return urgentDonorRepository.findByBloodGroupIgnoreCase(bloodGroup);
        } else if (location != null && !location.isEmpty()) {
            return urgentDonorRepository.findByLocationContainingIgnoreCase(location);
        } else {
            return urgentDonorRepository.findAll();
        }
    }


    @Override
    public List<UrgentDonor> searchDonorsByBloodGroup(String bloodGroup) {
        return urgentDonorRepository.findByBloodGroupIgnoreCase(bloodGroup);
    }


    @Override
    public List<UrgentDonor> searchDonorsByLocation(String location) {
        return urgentDonorRepository.findByLocationContainingIgnoreCase(location);
    }



    @Override
    public UrgentDonor saveDonor(UrgentDonor donor) {
        return urgentDonorRepository.save(donor);
    }

 




    // public UrgentDonor updateDonor(Long id, UrgentDonor urgentDonor) {
    //     if (!urgentDonorRepository.existsById(id)) {
    //         throw new RuntimeException("Donor not found with ID: " + id);
    //     }
        
    //     // Fetch the existing donor to preserve the User association
    //     UrgentDonor existingDonor = urgentDonorRepository.findById(id).get();
    
    //     // Ensure the User association is maintained
    //     if (existingDonor.getUser() != null) {
    //         urgentDonor.setUser(existingDonor.getUser()); // Set the existing User on the donor
    //     }
    
    //     urgentDonor.setId(id); // Ensure the ID is set for the update
    //     return urgentDonorRepository.save(urgentDonor); // Save the updated donor
    // }
    



    // public UrgentDonor updateDonor(Long id, UrgentDonor urgentDonor) {
    //     if (!urgentDonorRepository.existsById(id)) {
    //         throw new RuntimeException("Donor not found with ID: " + id);
    //     }

    //     UrgentDonor existingDonor = urgentDonorRepository.findById(id).get();
    //     if (existingDonor.getUser() != null) {
    //         urgentDonor.setUser(existingDonor.getUser());
    //     }

    //     urgentDonor.setId(id);

    //     // Save the updated urgent donor
    //     UrgentDonor updatedDonor = urgentDonorRepository.save(urgentDonor);

    //     // Update all related notifications
    //     // notificationRepository.findByUrgentDonorId(id).forEach(notification -> {
    //     //     String updatedMessage = String.format(
    //     //         "Urgent donor updated:\nName: %s\nBlood Group: %s\nLocation: %s\nPhone: %s\nEmail: %s",
    //     //         updatedDonor.getName(),
    //     //         updatedDonor.getBloodGroup(),
    //     //         updatedDonor.getLocation(),
    //     //         updatedDonor.getPhone(),
    //     //         updatedDonor.getEmail()
    //     //     );
    //     //     notification.setMessage(updatedMessage);
    //     //     notificationRepository.save(notification); // Save the updated notification
    //     // });


    //     List<Notification> notifications = notificationRepository.findByUrgentDonorId(id);
    //     for (Notification notification : notifications) {
    //         String updatedMessage = String.format(
    //             "Urgent donor updated:\nName: %s\nBlood Group: %s\nLocation: %s\nPhone: %s\nEmail: %s",
    //             updatedDonor.getName(),
    //             updatedDonor.getBloodGroup(),
    //             updatedDonor.getLocation(),
    //             updatedDonor.getPhone(),
    //             updatedDonor.getEmail()
    //         );
    //         notification.setMessage(updatedMessage);
    //         notificationRepository.save(notification); // Save updated notification
    //     }

    //     return updatedDonor;
    // }



    @Override
    public UrgentDonor updateDonor(Long id, UrgentDonor urgentDonor) {
        if (!urgentDonorRepository.existsById(id)) {
            throw new RuntimeException("Donor not found with ID: " + id);
        }
        
        UrgentDonor existingDonor = urgentDonorRepository.findById(id).orElseThrow(() -> 
            new RuntimeException("Donor not found with ID: " + id));
        
        // Retain the user association if exists
        if (existingDonor.getUser() != null) {
            urgentDonor.setUser(existingDonor.getUser());
        }
        
        // Retain the same ID
        urgentDonor.setId(id);
        
        // Update the donor details
        urgentDonor.setRequiredDate(urgentDonor.getRequiredDate());
        urgentDonor.setRequiredTime(urgentDonor.getRequiredTime());
        urgentDonor.setQuantity(urgentDonor.getQuantity());
        
        // Save the updated donor
        UrgentDonor updatedDonor = urgentDonorRepository.save(urgentDonor);
        
        // Update associated notifications (if any)
        List<Notification> notifications = notificationRepository.findByUrgentDonorId(id);
        for (Notification notification : notifications) {
            String updatedMessage = String.format(
                "Urgent donor updated:\nName: %s\nBlood Group: %s\nLocation: %s\nPhone: %s\nEmail: %s\nRequired Date: %s\nRequired Time: %s\nQuantity: %d",
                updatedDonor.getName(),
                updatedDonor.getBloodGroup(),
                updatedDonor.getLocation(),
                updatedDonor.getPhone(),
                updatedDonor.getEmail(),
                updatedDonor.getRequiredDate(),
                updatedDonor.getRequiredTime(),
                updatedDonor.getQuantity()
            );
            notification.setMessage(updatedMessage);
            notificationRepository.save(notification); // Save the updated notification
        }
        
        return updatedDonor;
    }
    

    // public UrgentDonor updateDonor(Long id, UrgentDonor urgentDonor) {
    //     if (!urgentDonorRepository.existsById(id)) {
    //         throw new RuntimeException("Donor not found with ID: " + id);
    //     }
    
    //     // Fetch the existing donor to retain associations
    //     UrgentDonor existingDonor = urgentDonorRepository.findById(id).orElseThrow(() ->
    //             new RuntimeException("Donor not found with ID: " + id));
    
    //     // Retain the user association
    //     if (existingDonor.getUser() != null) {
    //         urgentDonor.setUser(existingDonor.getUser());
    //     }
    
    //     // Retain the same ID
    //     urgentDonor.setId(id);
    
    //     // Save the updated urgent donor
    //     UrgentDonor updatedDonor = urgentDonorRepository.save(urgentDonor);
    
    //     // Update associated notifications
    //     List<Notification> notifications = notificationRepository.findByUrgentDonorId(id);
    //     for (Notification notification : notifications) {
    //         String updatedMessage = String.format(
    //             "Urgent donor updated:\nName: %s\nBlood Group: %s\nLocation: %s\nPhone: %s\nEmail: %s",
    //             updatedDonor.getName(),
    //             updatedDonor.getBloodGroup(),
    //             updatedDonor.getLocation(),
    //             updatedDonor.getPhone(),
    //             updatedDonor.getEmail()
    //         );
    //         notification.setMessage(updatedMessage);
    //         notificationRepository.save(notification); // Save the updated notification
    //     }
    
    //     return updatedDonor;
    // }




    @Override
    public void deleteDonor(Long id) {
        if (!urgentDonorRepository.existsById(id)) {
            throw new RuntimeException("Donor not found with ID: " + id);
        }
    
        UrgentDonor donor = urgentDonorRepository.findById(id).get(); // Find the donor to be deleted
        User user = donor.getUser(); // Get the associated User
    
        // Remove the Donor reference from the User
        if (user != null) {
            user.setUrgentDonor(null); // Null out the Donor reference in the User entity
        }
    
        urgentDonorRepository.deleteById(id); // Delete the Donor
    }
}
