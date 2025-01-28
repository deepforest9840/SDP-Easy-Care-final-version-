package com.dailycodework.dreamshops.service.hospitalappointment;


import com.dailycodework.dreamshops.model.HospitalAppointment;
import com.dailycodework.dreamshops.model.dAppointment;
import com.dailycodework.dreamshops.repository.HospitalAppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class HospitalAppointmentService {

    @Autowired
    private HospitalAppointmentRepository repository;

    // Add a new record
    public HospitalAppointment addAppointment(HospitalAppointment appointment) {
        return repository.save(appointment);
    }

    // Delete a record by appid
    public void deleteAppointmentById(Long appid) {
        repository.deleteById(appid);
    }

    // Get hospital stats (distinct name and sum of noOfPatient)
    public List<Object[]> getHospitalStats() {
        return repository.getHospitalStats();
    }

    // Get stats for a specific name (distinct area and sum of noOfPatient)
    public List<Object[]> getAreaStatsByName(String name) {
        return repository.getAreaStatsByName(name);
    }



    // Get hospital stats for a specific area
public List<Object[]> getHospitalStatsByArea(String area) {
    return repository.getHospitalStatsByArea(area);
}

}

