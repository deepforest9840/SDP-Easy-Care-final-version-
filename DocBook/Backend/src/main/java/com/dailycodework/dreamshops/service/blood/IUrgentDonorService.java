package com.dailycodework.dreamshops.service.blood;

import com.dailycodework.dreamshops.model.UrgentDonor;

import java.util.List;

public interface IUrgentDonorService {

    List<UrgentDonor> getAllDonors();

    List<UrgentDonor> searchDonors(String bloodGroup, String location);


    List<UrgentDonor> searchDonorsByBloodGroup(String bloodGroup);

    List<UrgentDonor> searchDonorsByLocation(String location);


    UrgentDonor saveDonor(UrgentDonor donor);


    UrgentDonor updateDonor(Long id, UrgentDonor urgentDonor);


    void deleteDonor(Long id);
    
}
