package com.dailycodework.dreamshops.service.appointment;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import com.dailycodework.dreamshops.model.Appointment;
import com.dailycodework.dreamshops.model.Doctor;
import com.dailycodework.dreamshops.dto.AppointmentInfoDto;
import com.dailycodework.dreamshops.dto.AppointmentInfoDtoBuilder;
import com.dailycodework.dreamshops.repository.AppointmentRepository;
import com.dailycodework.dreamshops.repository.DoctorRepository;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;
    @Autowired
    private DoctorRepository doctorRepository;

    public List<AppointmentInfoDto> findAppointmentsByUserEmail(String email) {
        AppointmentInfoDtoBuilder builder = new AppointmentInfoDtoBuilder();
        List<AppointmentInfoDto> appointmentInfoDtos = new ArrayList<>();
 
        List<Appointment> appointments = appointmentRepository.findAppointmentsByEmail(email) ;
        if (appointments != null) {
            for(Appointment appointment : appointments)
            {
                Long id = appointment.getDoctorId();
                Doctor doctor = doctorRepository.findById(id).orElse(null);
                if (doctor != null) {
                    AppointmentInfoDto appointmentInfoDto = builder.setPatientName(appointment.getPatientName())
                            .setPatientContactNumber(appointment.getContactNumber())
                            .setPatientEmail(appointment.getEmail())
                            .setDoctorName(doctor.getName())
                            .setDoctorEmail(doctor.getGmail())
                            .setDoctorDescription(doctor.getDescription())
                            .setAppointmentDate(appointment.getAppointmentDate())
                            .setStatus(appointment.getStatus())
                            .setDAppointmentId(appointment.getDAppointmentId())
                            .setAppointmentId(appointment.getId())  
                                                     
                            .build();
                    appointmentInfoDtos.add(appointmentInfoDto);
                }
            }
        }

        return appointmentInfoDtos ;
    } 
    public List<AppointmentInfoDto> findAppointmentsByDoctorId(Long id) {
        AppointmentInfoDtoBuilder builder = new AppointmentInfoDtoBuilder();
        List<AppointmentInfoDto> appointmentInfoDtos = new ArrayList<>();
 
        List<Appointment> appointments = appointmentRepository.findAppointmentsByDoctorId(id) ;
        if (appointments != null) {
            for(Appointment appointment : appointments)
            {
                Long doctorId = appointment.getDoctorId();
                Doctor doctor = doctorRepository.findById(id).orElse(null);
                if (doctor != null) {
                    AppointmentInfoDto appointmentInfoDto = builder.setPatientName(appointment.getPatientName())
                            .setPatientContactNumber(appointment.getContactNumber())
                            .setPatientEmail(appointment.getEmail())
                            .setDoctorName(doctor.getName())
                            .setDoctorEmail(doctor.getGmail())
                            .setDoctorDescription(doctor.getDescription())
                            .setAppointmentDate(appointment.getAppointmentDate())
                            .setStatus(appointment.getStatus())  
                            .setDAppointmentId(appointment.getDAppointmentId())                        
                            .setAppointmentId(appointment.getId())

                            .build();
                    appointmentInfoDtos.add(appointmentInfoDto);
                }
            }
        }

        return appointmentInfoDtos ;
    }
    
    public void updateAppointmentStatus(Long appointmentId, String status) {
        appointmentRepository.updateAppointmentStatus(appointmentId , status);
    }
}
