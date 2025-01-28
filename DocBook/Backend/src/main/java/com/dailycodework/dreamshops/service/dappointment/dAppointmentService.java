package com.dailycodework.dreamshops.service.dappointment;



import com.dailycodework.dreamshops.model.Doctor;
import com.dailycodework.dreamshops.model.dAppointment;
import com.dailycodework.dreamshops.repository.dAppointmentRepository;
import com.dailycodework.dreamshops.service.doctor.DoctorService;
import com.dailycodework.dreamshops.repository.HospitalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class dAppointmentService {

    @Autowired
    private dAppointmentRepository appointmentRepository;

    @Autowired
    private HospitalRepository hospitalRepository;

    // Create an appointment
    public dAppointment createAppointment(dAppointment appointment) {
        return appointmentRepository.save(appointment);
    }

    // Get all appointments
    public List<dAppointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    // Search for appointments before a specific time
    public List<dAppointment> getAppointmentsBeforeTime(LocalDateTime time) {
        return appointmentRepository.findByTimeBefore(time);
    }

    // // Get all appointments for a specific hospital by area
    // public List<dAppointment> getAppointmentsByHospitalArea(String area) {
    //     return appointmentRepository.findByHospitalArea(area);
    // }

    // Get all appointments for a specific hospital by name
    // public List<dAppointment> getAppointmentsByHospitalName(String name) {
    //     return appointmentRepository.findByHospitalName(name);
    // }

    // Get all appointments by a specific hospital ID
    public List<dAppointment> getAppointmentsByHospitalId(Long hospitalId) {
        return appointmentRepository.findByHospitalId(hospitalId);
    }


    // Method to increment the number of patients for an appointment
    public dAppointment incrementNoOfPatient(Long appointmentId) {
        // Retrieve the appointment by ID
        dAppointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));

        // Increment the number of patients
        appointment.setNoOfPatient(appointment.getNoOfPatient() + 1);

        // Save the updated appointment
        return appointmentRepository.save(appointment);
    }

    public int getNoOfPatients(Long appointmentId) {
        Optional<dAppointment> appointment = appointmentRepository.findById(appointmentId);
        if (appointment.isPresent()) {
            return appointment.get().getNoOfPatient(); // Fetching the number of patients
        } else {
            throw new RuntimeException("Appointment not found");
        }
    }

    public List<dAppointment> getAppointmentsByFee(double fee) {
        return appointmentRepository.findByFeeLessThan(fee);
    }

    
  // Get all appointments by hospital name
 
   
    // Method to find appointments by hospital name
    // Method to find appointments by hospital name
public List<dAppointment> findAppointmentsByHospitalName(String hospitalName) {
    // Step 1: Get hospital IDs by hospital name
    List<Long> hospitalIds = appointmentRepository.findHospitalIdsByName(hospitalName);

    // If no hospital IDs are found, return an empty list or handle accordingly
    if (hospitalIds == null || hospitalIds.isEmpty()) {
        return List.of(); // Or throw an exception
    }

    // Step 2: Find appointments using the list of hospital IDs
    return appointmentRepository.findAppointmentsByHospitalIds(hospitalIds);
}


// Get all appointments by hospital area
// public List<dAppointment> getAppointmentsByHospitalArea(String area) {
//     return appointmentRepository.findByHospitalArea(area);
// }









public List<dAppointment> findAppointmentsByHospitalArea(String hospitalArea) {
    // // Step 1: Get hospital_id by hospital.name
    // BigDecimal hospitalId = appointmentRepository.findHospitalIdByName(hospitalArea);

    // // If hospitalId is null, return an empty list or handle accordingly
    // if (hospitalId == null) {
    //     return List.of(); // Or throw an exception
    // }

    // // Step 2: Find appointments using the hospital_id
    // return appointmentRepository.findAppointmentsByHospitalId(hospitalId);



    List<Long> hospitalIds = appointmentRepository.findHospitalIdsByArea(hospitalArea);

    // If no hospital IDs are found, return an empty list or handle accordingly
    if (hospitalIds == null || hospitalIds.isEmpty()) {
        return List.of(); // Or throw an exception
    }

    // Step 2: Find appointments using the list of hospital IDs
    return appointmentRepository.findAppointmentsByHospitalIds(hospitalIds);
}








@Autowired
private DoctorService doctorService;  // Inject the DoctorService to use getDoctorsByCategory

public List<dAppointment> getAppointmentsByCategory(String categoryName) {
    // Step 1: Get all doctors for the given category
    List<Doctor> doctors = doctorService.getDoctorsByCategory(categoryName);

    // Step 2: Extract doctor IDs
    List<Long> doctorId = doctors.stream()
                                  .map(Doctor::getId)
                                  .collect(Collectors.toList());

    // Step 3: Fetch appointments based on doctor IDs
    return appointmentRepository.findAppointmentsByDoctorId(doctorId);
}




























 public List<dAppointment> filterAppointments(String name, String area, Double fee,String category) {
        List<Long> hospitalIds = null;

        // Step 1: Filter by hospital name (if provided)
        if (name != null && !name.isEmpty()) {
            hospitalIds = appointmentRepository.findHospitalIdsByName(name);
        }

        // Step 2: Filter by hospital area (if provided)
        if (area != null && !area.isEmpty()) {
            // If hospitalIds are already filtered by name, we apply area filter on top of that
            if (hospitalIds != null && !hospitalIds.isEmpty()) {
                hospitalIds = appointmentRepository.findHospitalIdsByArea(area);
            } else {
                hospitalIds = appointmentRepository.findHospitalIdsByArea(area);
            }
        }

        // Step 3: Fetch appointments by hospital IDs
        List<dAppointment> appointments = new ArrayList<>();
        if (hospitalIds != null && !hospitalIds.isEmpty()) {
            appointments = appointmentRepository.findAppointmentsByHospitalIds(hospitalIds);
        }

        // Step 4: Filter by fee (if provided)
        if (fee != null) {
            appointments = filterByFee(appointments, fee);
        }

        if (category != null && !category.isEmpty()) {
            List<dAppointment> categoryAppointments = getAppointmentsByCategory(category);
            // Retain only the appointments that match both category and previous filters
            appointments = appointments.stream()
                                       .filter(categoryAppointments::contains)
                                       .collect(Collectors.toList());
        }
    

        return appointments;
    }

    // Helper method to filter appointments by fee
    private List<dAppointment> filterByFee(List<dAppointment> appointments, double fee) {
        List<dAppointment> filteredAppointments = new ArrayList<>();
        for (dAppointment appointment : appointments) {
            if (appointment.getFee() < fee) {
                filteredAppointments.add(appointment);
            }
        }
        return filteredAppointments;
    }


    public void deleteAppointment(Long appointmentId) {
        if (!appointmentRepository.existsById(appointmentId)) {
            throw new RuntimeException("Appointment not found with ID: " + appointmentId);
        }
        appointmentRepository.deleteById(appointmentId);
    }
    










}
