package com.dailycodework.dreamshops.service.prescription;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dailycodework.dreamshops.model.Prescription;
import com.dailycodework.dreamshops.repository.AppointmentRepository;
import com.dailycodework.dreamshops.repository.PrescriptionRepository;

@Service
public class PrescriptionService {

    private final PrescriptionRepository prescriptionRepository;
    
    private final AppointmentRepository appointmentRepository ;

    public PrescriptionService(PrescriptionRepository prescriptionRepository,AppointmentRepository appointmentRepository) {
        this.prescriptionRepository = prescriptionRepository;
        this.appointmentRepository = appointmentRepository ;
    }

    public Prescription savePrescription(Prescription prescription) {
        return prescriptionRepository.save(prescription);
    }
    public List<Prescription> getPrescriptionByAppId(Long appointmentId) {
        return prescriptionRepository.findByAppointmentId(appointmentId);
    }

    public List<Prescription> getPrescriptionByPatientEmail(String patientEmail) {
        return prescriptionRepository.findByPatientEmail(patientEmail);
    }

    public void updateSeenStatus(Long id, String seenStatus) {
        try{
        List<Prescription> prescriptions = prescriptionRepository.findByAppointmentId(id);
        // here we need to perform update appointment status

        for (Prescription prescription : prescriptions) {
            prescription.setSeenStatus(seenStatus);
            prescriptionRepository.updateSeenStatus(id, seenStatus);
            appointmentRepository.updateAppointmentStatus(id, "prescribed");
        }
        }
        catch(Exception e )
        {
            
        }
    }
}
