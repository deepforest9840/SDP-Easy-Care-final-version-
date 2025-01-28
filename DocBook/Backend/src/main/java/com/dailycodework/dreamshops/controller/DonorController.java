package com.dailycodework.dreamshops.controller;

import com.dailycodework.dreamshops.model.Donor;
import com.dailycodework.dreamshops.model.User;

import com.dailycodework.dreamshops.repository.DonorRepository;
import com.dailycodework.dreamshops.repository.UserRepository;
import com.dailycodework.dreamshops.service.blood.IDonorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;




@RestController
@RequestMapping("/api/donors")
public class DonorController {

    private static final Logger logger = Logger.getLogger(DonorController.class.getName());

    private final IDonorService donorService;
    private final UserRepository userRepository;
    private final DonorRepository donorRepository;

    @Autowired
    public DonorController(IDonorService donorService, UserRepository userRepository, DonorRepository donorRepository) {
        this.donorService = donorService;
        this.userRepository = userRepository;
        this.donorRepository = donorRepository;
    }

    @GetMapping
    public ResponseEntity<List<Donor>> getAllDonors() {
        List<Donor> donors = donorService.getAllDonors();
        return ResponseEntity.ok(donors);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Donor>> searchDonors(
            @RequestParam(required = false) String bloodGroup,
            @RequestParam(required = false) String location) {
        List<Donor> donors = donorService.searchDonors(bloodGroup, location);
        return ResponseEntity.ok(donors);
    }

    @PostMapping
    public ResponseEntity<Donor> addDonor(@RequestBody Donor donor, @RequestParam String email) {
        logger.info("Received request to add donor: " + donor);
        logger.info("Received email: " + email);

        Optional<User> currentUser = Optional.ofNullable(userRepository.findUserByEmail(email));
        if (currentUser.isPresent()) {
            donor.setUser(currentUser.get());
            Donor savedDonor = donorService.saveDonor(donor);
            return ResponseEntity.ok(savedDonor);
        } else {
            return ResponseEntity.badRequest().body(null);
        }
    }


    // @PutMapping("/{id}")
    // public ResponseEntity<Donor> updateDonor(@PathVariable Long id, @RequestBody Donor donor) {
    //     logger.info("Received request to update donor with ID: " + id);
    //     try {
    //         Donor updatedDonor = donorService.updateDonor(id, donor);
    //         return ResponseEntity.ok(updatedDonor);
    //     } catch (Exception e) {
    //         logger.severe("Error updating donor: " + e.getMessage());
    //         return ResponseEntity.status(500).body(null);
    //     }
    // }


    @PutMapping("/{id}")
    public ResponseEntity<Donor> updateDonor(@PathVariable Long id, @RequestBody Donor donor) {
        logger.info("Received request to update donor with ID: " + id);
        
        try {
            // Fetch the existing donor to preserve the User association

            Optional<Donor> existingDonorOptional = donorRepository.findById(id);
            if (!existingDonorOptional.isPresent()) {
                logger.severe("Donor with ID " + id + " not found.");
                return ResponseEntity.notFound().build();
            }
            
            Donor existingDonor = existingDonorOptional.get();
            
            // Ensure the User association is maintained
            if (existingDonor.getUser() != null) {
                donor.setUser(existingDonor.getUser()); // Retain the existing User for the donor
            } else {
                logger.severe("User association is missing for donor with ID " + id);
                return ResponseEntity.status(400).body(null);  // Return an error if User is missing
            }

            // Set the ID of the donor to ensure the existing donor is updated
            donor.setId(id);

            // Save the updated donor
            Donor updatedDonor = donorService.saveDonor(donor);
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
            donorService.deleteDonor(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            logger.severe("Error deleting donor: " + e.getMessage());
            return ResponseEntity.status(500).build();
        }
    }
}