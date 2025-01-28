package com.dailycodework.dreamshops.service.hospital;

import com.dailycodework.dreamshops.model.Hospital;
import com.dailycodework.dreamshops.repository.HospitalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class HospitalService {

    private final HospitalRepository hospitalRepository;

    @Autowired
    public HospitalService(HospitalRepository hospitalRepository) {
        this.hospitalRepository = hospitalRepository;
    }

    /**
     * Retrieve a list of hospitals based on the longest name match.
     *
     * @param name the name to search for
     * @return list of hospitals matching the name
     */
    public List<Hospital> getHospitalsByNameLongestMatch(String name) {
        return hospitalRepository.findByNameLongestMatch(name);
    }

    /**
     * Retrieve a list of hospitals based on the longest area match.
     *
     * @param area the area to search for
     * @return list of hospitals matching the area
     */
    public List<Hospital> getHospitalsByAreaLongestMatch(String area) {
        return hospitalRepository.findByAreaLongestMatch(area);
    }

    /**
     * Retrieve the hospital ID based on an exact match for both name and area.
     *
     * @param name the name of the hospital
     * @param area the area of the hospital
     * @return optional containing the hospital ID if found
     */
    public Optional<Long> getHospitalIdByNameAndArea(String name, String area) {
        return hospitalRepository.findIdByNameIgnoreCaseAndAreaIgnoreCase(name, area);
    }

    /**
     * Save a new hospital or update an existing hospital.
     *
     * @param hospital the hospital object to save
     * @return the saved hospital object
     */
    public Hospital saveHospital(Hospital hospital) {
        return hospitalRepository.save(hospital);
    }

    /**
     * Retrieve all hospitals from the database.
     *
     * @return list of all hospitals
     */
    public List<Hospital> getAllHospitals() {
        return hospitalRepository.findAll();
    }

    public Hospital addHospital(Hospital hospital) {
        return hospitalRepository.save(hospital);
    }

    public Optional<Hospital> getHospitalNameAndAreaById(Long id) {
        return hospitalRepository.findHospitalNameAndAreaById(id);
    }
    

}
