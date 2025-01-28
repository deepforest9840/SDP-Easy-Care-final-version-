package com.dailycodework.dreamshops.service.blood;

import com.dailycodework.dreamshops.model.Donor;
import com.dailycodework.dreamshops.model.User;
import com.dailycodework.dreamshops.repository.DonorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;





@Service
public class DonorService implements IDonorService{

    private final DonorRepository donorRepository;

    @Autowired
    public DonorService(DonorRepository donorRepository) {
        this.donorRepository = donorRepository;
    }

    @Override
    public List<Donor> getAllDonors() {
        return donorRepository.findAll();
    }


    @Override
    public List<Donor> searchDonors(String bloodGroup, String location) {
        if (bloodGroup != null && !bloodGroup.isEmpty() && location != null && !location.isEmpty()) {
            return donorRepository.findByBloodGroupIgnoreCaseAndLocationContainingIgnoreCase(bloodGroup, location);
        } else if (bloodGroup != null && !bloodGroup.isEmpty()) {
            return donorRepository.findByBloodGroupIgnoreCase(bloodGroup);
        } else if (location != null && !location.isEmpty()) {
            return donorRepository.findByLocationContainingIgnoreCase(location);
        } else {
            return donorRepository.findAll();
        }
    }


    @Override
    public List<Donor> searchDonorsByBloodGroup(String bloodGroup) {
        return donorRepository.findByBloodGroupIgnoreCase(bloodGroup);
    }


    @Override
    public List<Donor> searchDonorsByLocation(String location) {
        return donorRepository.findByLocationContainingIgnoreCase(location);
    }



    @Override
    public Donor saveDonor(Donor donor) {
        return donorRepository.save(donor);
    }

    // public Donor updateDonor(Long id, Donor donor) {
    //     if (!donorRepository.existsById(id)) {
    //         throw new RuntimeException("Donor not found with ID: " + id);
    //     }
    //     donor.setId(id); // Ensure the ID is set for the update
    //     return donorRepository.save(donor);
    // }


    @Override
    public Donor updateDonor(Long id, Donor donor) {
        if (!donorRepository.existsById(id)) {
            throw new RuntimeException("Donor not found with ID: " + id);
        }
        
        // Fetch the existing donor to preserve the User association
        Donor existingDonor = donorRepository.findById(id).get();
    
        // Ensure the User association is maintained
        if (existingDonor.getUser() != null) {
            donor.setUser(existingDonor.getUser()); // Set the existing User on the donor
        }
    
        donor.setId(id); // Ensure the ID is set for the update
        return donorRepository.save(donor); // Save the updated donor
    }
    

    // public void deleteDonor(Long id) {
    //     if (!donorRepository.existsById(id)) {
    //         throw new RuntimeException("Donor not found with ID: " + id);
    //     }
    //     donorRepository.deleteById(id);
    // }

    @Override
    public void deleteDonor(Long id) {
        if (!donorRepository.existsById(id)) {
            throw new RuntimeException("Donor not found with ID: " + id);
        }
    
        Donor donor = donorRepository.findById(id).get(); // Find the donor to be deleted
        User user = donor.getUser(); // Get the associated User
    
        // Remove the Donor reference from the User
        if (user != null) {
            user.setDonor(null); // Null out the Donor reference in the User entity
        }
    
        donorRepository.deleteById(id); // Delete the Donor
    }
    
}
