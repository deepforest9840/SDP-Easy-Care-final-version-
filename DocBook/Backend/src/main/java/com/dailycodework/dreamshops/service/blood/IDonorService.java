package com.dailycodework.dreamshops.service.blood;

import com.dailycodework.dreamshops.model.Donor;

import java.util.List;

public interface IDonorService {
    List<Donor> getAllDonors();

    List<Donor> searchDonors(String bloodGroup, String location);

    List<Donor> searchDonorsByBloodGroup(String bloodGroup);

    List<Donor> searchDonorsByLocation(String location);

    Donor saveDonor(Donor donor);

    Donor updateDonor(Long id, Donor donor);

    void deleteDonor(Long id);
}
