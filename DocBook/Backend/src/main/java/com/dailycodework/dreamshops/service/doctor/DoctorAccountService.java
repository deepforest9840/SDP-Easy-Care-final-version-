package com.dailycodework.dreamshops.service.doctor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dailycodework.dreamshops.dto.LoginRequestDto;
import com.dailycodework.dreamshops.model.DoctorAccount;
import com.dailycodework.dreamshops.model.User;
import com.dailycodework.dreamshops.repository.DoctorAccountRepository;

import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class DoctorAccountService {

    @Autowired
    private DoctorAccountRepository doctorAccountRepository ;


    public boolean checkLoginCredentials(LoginRequestDto loginRequestDto) {
        // Retrieve the user by email
        DoctorAccount doctorAccount = doctorAccountRepository.findDoctorAccountByEmail(loginRequestDto.getEmail());

        // Validate user and password
        if (doctorAccount != null) {
            if(doctorAccount.getEmail().equals(loginRequestDto.getEmail()) && doctorAccount.getPassword().equals(loginRequestDto.getPassword())){
                return true ;
            }
            else return false ;
        }

        return false;
    }
    
    
}
