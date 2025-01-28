package com.dailycodework.dreamshops.controller;

import com.dailycodework.dreamshops.model.Hospital;
import com.dailycodework.dreamshops.service.hospital.HospitalService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/hospitals")
public class HospitalController {

    private final HospitalService hospitalService;

    @Autowired
    public HospitalController(HospitalService hospitalService) {
        this.hospitalService = hospitalService;
    }

    /**
     * Get all hospitals.
     *
     * @return list of all hospitals
     */
    @GetMapping("/all")
    public ResponseEntity<List<Hospital>> getAllHospitals() {
        List<Hospital> hospitals = hospitalService.getAllHospitals();
        return ResponseEntity.ok(hospitals);
    }

    /**
     * Get hospitals by the longest name match.
     *
     * @param name the hospital name to search for
     * @return list of hospitals matching the name
     */
    @GetMapping("/by-name")
    public ResponseEntity<List<Hospital>> getHospitalsByName(@RequestParam String name) {
        List<Hospital> hospitals = hospitalService.getHospitalsByNameLongestMatch(name);
        return ResponseEntity.ok(hospitals);
    }

    /**
     * Get hospitals by the longest area match.
     *
     * @param area the hospital area to search for
     * @return list of hospitals matching the area
     */
    @GetMapping("/by-area")
    public ResponseEntity<List<Hospital>> getHospitalsByArea(@RequestParam String area) {
        List<Hospital> hospitals = hospitalService.getHospitalsByAreaLongestMatch(area);
        return ResponseEntity.ok(hospitals);
    }

    /**
     * Get hospital ID by exact match of name and area.
     *
     * @param name the hospital name
     * @param area the hospital area
     * @return the hospital ID if found
     */
    @GetMapping("/by-name-and-area")
    public ResponseEntity<Long> getHospitalIdByNameAndArea(
            @RequestParam String name,
            @RequestParam String area) {
        Optional<Long> hospitalId = hospitalService.getHospitalIdByNameAndArea(name, area);
        return hospitalId.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Add a new hospital to the system.
     *
     * @param hospital the hospital object to be added
     * @return the created hospital
     */
    @PostMapping("/add")
    public ResponseEntity<Hospital> addHospital(@RequestBody Hospital hospital) {
        Hospital createdHospital = hospitalService.addHospital(hospital);
        return ResponseEntity.ok(createdHospital);
    }



    @GetMapping("/by-id")
public ResponseEntity<Hospital> getHospitalNameAndAreaById(@RequestParam Long id) {
    Optional<Hospital> hospital = hospitalService.getHospitalNameAndAreaById(id);
    return hospital.map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
}



}
