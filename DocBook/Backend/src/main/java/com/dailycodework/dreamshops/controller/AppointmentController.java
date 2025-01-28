package com.dailycodework.dreamshops.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springdoc.core.converters.models.Sort;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dailycodework.dreamshops.Factory.SortFactory;
import com.dailycodework.dreamshops.dto.AppointmentInfoDto;
import com.dailycodework.dreamshops.model.Appointment;
import com.dailycodework.dreamshops.repository.AppointmentRepository;
import com.dailycodework.dreamshops.service.appointment.AppointmentService;
import com.dailycodework.dreamshops.service.notification.NotificationManager;
import com.dailycodework.dreamshops.strategy.MergeSortStrategy;
import com.dailycodework.dreamshops.strategy.SortStrategy;
import com.dailycodework.dreamshops.strategy.Sorter;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/newappointments")
public class AppointmentController {

    @Autowired
    private NotificationManager notificationManager;
    @Autowired
    private AppointmentRepository appointmentRepository;
    @Autowired
    private AppointmentService appointmentService;
    
    

    // POST: Create a new appointment
    @PostMapping("/add")
    public ResponseEntity<Appointment> createAppointment(@Validated @RequestBody Appointment appointment) {
        Appointment savedAppointment = appointmentRepository.save(appointment);
        notificationManager.addAppointmentToDoctor(appointment.getDoctorId(), appointment);       


        return ResponseEntity.ok(savedAppointment);
    }

    // GET: List all appointments (optional)
    @GetMapping("/getAll")
    public ResponseEntity<List<Appointment>> getAllAppointments() {
        List<Appointment> appointments = appointmentRepository.findAll();
        return ResponseEntity.ok(appointments);
    }

    @GetMapping("/getAppointments")
    public ResponseEntity<List<Appointment>> getAppointments(@RequestParam("email") String email) {
        List<Appointment> appointments = appointmentRepository.findAppointmentsByEmail(email) ;
        return ResponseEntity.ok(appointments);
    }
    @GetMapping("/getAppointmentsByUserEmail")
    public ResponseEntity<List<AppointmentInfoDto>> getAppointmentsByUserEmail(@RequestParam("email") String email) {
        List<AppointmentInfoDto> appointments = appointmentService.findAppointmentsByUserEmail(email) ;
        return ResponseEntity.ok(appointments);
    }

    @GetMapping("/getAppointmentsByDoctorId")
    public ResponseEntity<List<AppointmentInfoDto>> getAppointmentsByDoctorId(@RequestParam("doctorId") Long doctorId) {
        List<AppointmentInfoDto> appointments = appointmentService.findAppointmentsByDoctorId(doctorId) ;
        
        String sortmethod = "merge" ;

        Sorter sorter = new Sorter() ;

        SortStrategy sortStrategy = SortFactory.getInsatance().getSortMethod(sortmethod) ;

        sorter.setSortStrategy(sortStrategy) ;

        appointments = sorter.sort(appointments) ; 
        
        return ResponseEntity.ok(appointments);
    }
    
    @GetMapping("/deleteAppointmentByDoctorAndNotifyPatients")
    public ResponseEntity<Map<String, String>> deleteAppointmentByDoctor(@RequestParam("doctorId") Long doctorId, @RequestParam("DAppointmentId") Long DAppointmentId) {   
        
        notificationManager.setNotifyToDo("deleteappointment", doctorId, DAppointmentId);
        notificationManager.removeAppointmentFromDoctor(doctorId, DAppointmentId);                                                                                                                                           
        Map<String, String> response = new HashMap<>();
        response.put("message", "Appointment deleted successfully and notify the patients");
        response.put("status", "success");
        return ResponseEntity.ok(response);
    }
   
}
