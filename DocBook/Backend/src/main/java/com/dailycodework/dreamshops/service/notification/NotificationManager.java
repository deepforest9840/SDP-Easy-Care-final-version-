package com.dailycodework.dreamshops.service.notification;
    
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dailycodework.dreamshops.model.Appointment;
import com.dailycodework.dreamshops.repository.AppointmentRepository;

import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;

@Service
public class NotificationManager {
    
    @Autowired
    private AppointmentRepository appointmentRepository ;

    // Map where the key is the doctor's email (or ID) and the value is a list of patients
    private Map<Long, List<Appointment>> doctorAppointmentMap = new HashMap<>();
    private String notifyToDo ;

    public NotificationManager() {
        
    }

    @PostConstruct
    public void init() {
        loadAppointmentsFromDatabase();
    }
    
    public String getNotifyToDo() {
        return notifyToDo;
    }
    public void setNotifyToDo(String notifyToDo,Long doctorId,Long DappointmentId) {
        this.notifyToDo = notifyToDo;
        
        if(notifyToDo.equals("deleteappointment")){
            notifyForDeleteAppointment(doctorId,DappointmentId);
        }

    }
    // Method to add a patient to a doctor's list
    public void addAppointmentToDoctor(Long doctorId , Appointment appointment) {
        doctorAppointmentMap.computeIfAbsent(doctorId, k -> new ArrayList<>()).add(appointment);    

    }
     // Method to remove a patient from a doctor's list
     public void removeAppointmentFromDoctor(Long doctorId, Long appointmentId) {
        List<Appointment> appointments = doctorAppointmentMap.get(doctorId);
        if (appointments != null) {
            appointments.removeIf(appointment -> appointment.getDAppointmentId().equals(appointmentId));
        }
    }

    public void loadAppointmentsFromDatabase(){
        List<Appointment> appointments = appointmentRepository.findAll();
        for(Appointment appointment : appointments){
            addAppointmentToDoctor(appointment.getDoctorId(), appointment);
        }
    }

    // Method to get the list of patients for a doctor
    public List<Appointment> getAppointmentsForDoctor(Long doctorId) {
        return doctorAppointmentMap.getOrDefault(doctorId, new ArrayList<>());
    }

    @Transactional
    public void notifyForDeleteAppointment(Long doctorId,Long DappointmentId){
        List<Appointment> appointments = getAppointmentsForDoctor(doctorId);
        
        for(Appointment appointment : appointments){

            if(appointment.getDAppointmentId().equals(DappointmentId)){
                
                appointment.setStatus("cancel appointment");
                appointmentRepository.updateAppointmentStatus(appointment.getId(), "cancel appointment");   
                System.out.println("Notifying " + appointment.getPatientName() + " at " + appointment.getEmail() + " to " + notifyToDo);
            
            }
        }
    }
}

