package com.dailycodework.dreamshops.controller;


import com.dailycodework.dreamshops.dto.DoctorDto;
import com.dailycodework.dreamshops.dto.LoginRequestDto;
import com.dailycodework.dreamshops.dto.LoginStatusDto;
import com.dailycodework.dreamshops.exceptions.ResourceNotFoundException;
import com.dailycodework.dreamshops.model.Appointment;
import com.dailycodework.dreamshops.model.Doctor;
import com.dailycodework.dreamshops.model.DoctorAccount;
import com.dailycodework.dreamshops.model.User;
import com.dailycodework.dreamshops.model.UserBuilder;
import com.dailycodework.dreamshops.repository.UserRepository;
import com.dailycodework.dreamshops.request.AddDoctorRequest;
import com.dailycodework.dreamshops.request.DoctorUpdateRequest;
import com.dailycodework.dreamshops.response.ApiResponse;
import com.dailycodework.dreamshops.service.doctor.DoctorAccountService;
import com.dailycodework.dreamshops.service.doctor.IDoctorService;
import com.dailycodework.dreamshops.service.user.UserService;
import com.dailycodework.dreamshops.repository.DoctorAccountRepository;


import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import static org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR;
import static org.springframework.http.HttpStatus.NOT_FOUND;

@RequiredArgsConstructor
@RestController
@RequestMapping("${api.prefix}/DoctorAccount")
public class DoctorAccountController {

 
    @Autowired
    private DoctorAccountRepository doctorAccountRepository;
    @Autowired
    private DoctorAccountService doctorAccountService ;

    @PostMapping("/signup")
    public ResponseEntity<String> signUp(@RequestBody DoctorAccount doctorAccount) {
        try {
            //+− _=
            doctorAccount.setLoginStatus("logedout");
            doctorAccountRepository.save(doctorAccount) ;
            return ResponseEntity.ok("User signed up successfully!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDto loginRequestDto) {
        boolean isValid = doctorAccountService.checkLoginCredentials(loginRequestDto);

        if (isValid) {

            doctorAccountRepository.updateDoctorAccountLoginStatus("logedin",loginRequestDto.getEmail());

            // return ResponseEntity.ok("Login successful!");
            return ResponseEntity.ok(Map.of("message", "Login successful!"));
        } else {
            return ResponseEntity.status(401).body(Map.of("error", "Invalid email or password"));
        }
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping("/loginStatus")
    public ResponseEntity<String> getDoctorAccountLoginStatus(@RequestParam("email") String email) {
        // Find user by email
        DoctorAccount doctorAccount = doctorAccountRepository.findDoctorAccountByEmail(email);

        // Check if user is present
        if (doctorAccount != null) {
            return ResponseEntity.ok(doctorAccount.getLoginStatus());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }



    @GetMapping("/getDoctorAccount")
    public ResponseEntity<DoctorAccount> getDoctorAccount(@RequestParam("email") String email) {
        DoctorAccount doctorAccount = doctorAccountRepository.findDoctorAccountByEmail(email) ;
        return ResponseEntity.ok(doctorAccount);
    }



    

   
}
