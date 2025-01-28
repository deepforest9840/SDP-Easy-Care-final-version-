package com.dailycodework.dreamshops.controller;

import com.dailycodework.dreamshops.model.UrgentDonor;
import com.dailycodework.dreamshops.model.User;
import com.dailycodework.dreamshops.repository.UrgentDonorRepository;
import com.dailycodework.dreamshops.repository.UserRepository;
import com.dailycodework.dreamshops.service.blood.INotificationService;
import com.dailycodework.dreamshops.service.blood.IUrgentDonorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;




@RestController
@RequestMapping("/api/urgentdonors")


public class UrgentDonorController {
    private static final Logger logger = Logger.getLogger(UrgentDonorController.class.getName());

    private final IUrgentDonorService urgentDonorService;
    private final UserRepository userRepository;
    private final INotificationService notificationService;
    private final UrgentDonorRepository urgentDonorRepository;


    @Autowired
    public UrgentDonorController(IUrgentDonorService urgentDonorService, UserRepository userRepository, INotificationService notificationService, UrgentDonorRepository urgentDonorRepository) {
        this.urgentDonorService = urgentDonorService;
        this.userRepository = userRepository;
        this.notificationService = notificationService;
        this.urgentDonorRepository = urgentDonorRepository;
    }

    @GetMapping
    public ResponseEntity<List<UrgentDonor>> getAllDonors() {
        List<UrgentDonor> donors = urgentDonorService.getAllDonors();
        return ResponseEntity.ok(donors);
    }

    @GetMapping("/search")
    public ResponseEntity<List<UrgentDonor>> searchDonors(
            @RequestParam(required = false) String bloodGroup,
            @RequestParam(required = false) String location) {
        List<UrgentDonor> donors = urgentDonorService.searchDonors(bloodGroup, location);
        return ResponseEntity.ok(donors);
    }

    @PostMapping
    public ResponseEntity<UrgentDonor> addDonor(@RequestBody UrgentDonor urgentDonor, @RequestParam String email) {
        logger.info("Received request to add donor: " + urgentDonor);
        logger.info("Received email: " + email);

        Optional<User> currentUser = Optional.ofNullable(userRepository.findUserByEmail(email));
        if (currentUser.isPresent()) {
            urgentDonor.setUser(currentUser.get());
            UrgentDonor savedDonor = urgentDonorService.saveDonor(urgentDonor);
            notificationService.sendNotificationToAllDonors(savedDonor);  // Send notifications after saving the donor
            return ResponseEntity.ok(savedDonor);
        } else {
            return ResponseEntity.badRequest().body(null);
        }
    }


  



    @PutMapping("/{id}")
    public ResponseEntity<UrgentDonor> updateDonor(@PathVariable Long id, @RequestBody UrgentDonor urgentDonor) {
        logger.info("Received request to update donor with ID: " + id);
        
        try {
            // Fetch the existing donor to preserve the User association

            Optional<UrgentDonor> existingDonorOptional = urgentDonorRepository.findById(id);
            if (!existingDonorOptional.isPresent()) {
                logger.severe("Donor with ID " + id + " not found.");
                return ResponseEntity.notFound().build();
            }
            
            UrgentDonor existingDonor = existingDonorOptional.get();
            
            // Ensure the User association is maintained
            if (existingDonor.getUser() != null) {
                urgentDonor.setUser(existingDonor.getUser()); // Retain the existing User for the donor
            } else {
                logger.severe("User association is missing for donor with ID " + id);
                return ResponseEntity.status(400).body(null);  // Return an error if User is missing
            }

            // Set the ID of the donor to ensure the existing donor is updated
            urgentDonor.setId(id);

            // Save the updated donor
            UrgentDonor updatedDonor = urgentDonorService.saveDonor(urgentDonor);
            return ResponseEntity.ok(updatedDonor);
        } catch (Exception e) {
            logger.severe("Error updating donor: " + e.getMessage());
            return ResponseEntity.status(500).body(null);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDonor(@PathVariable Long id) {
        logger.info("Received request to delete donor with ID: " + id);
        try {
            urgentDonorService.deleteDonor(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            logger.severe("Error deleting donor: " + e.getMessage());
            return ResponseEntity.status(500).build();
        }
    }
}
