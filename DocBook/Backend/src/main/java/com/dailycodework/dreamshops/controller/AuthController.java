package com.dailycodework.dreamshops.controller;

import com.dailycodework.dreamshops.dto.LoginRequestDto;
import com.dailycodework.dreamshops.dto.LoginStatusDto ;
import com.dailycodework.dreamshops.model.Doctor;
import com.dailycodework.dreamshops.model.User;
import com.dailycodework.dreamshops.repository.LoginStatusRepository;
import com.dailycodework.dreamshops.repository.UserRepository;
import com.dailycodework.dreamshops.service.auth.AuthService;
import com.dailycodework.dreamshops.service.doctor.DoctorService;
import com.dailycodework.dreamshops.service.doctor.IDoctorService;

import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    @Autowired
    private AuthService authService;
    @Autowired
    private LoginStatusRepository loginStatusRepository ;

    @Autowired
    private UserRepository userRepository ;

    @Autowired
    private DoctorService doctorService ;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDto loginRequestDto) {
        boolean isValid = authService.checkLoginCredentials(loginRequestDto);

        if (isValid) {

            // Log the login attempt in the LoginStatus table
            LoginStatusDto loginStatusDto = new LoginStatusDto();
            loginStatusDto.setEmail(loginRequestDto.getEmail());
            loginStatusDto.setStatus(isValid ? "SUCCESS" : "FAILED");
            loginStatusDto.setLoginTime(LocalDateTime.now());
            authService.saveLoginStatus(loginStatusDto);
            authService.updateUserStatus(loginRequestDto.getEmail(), "logedin");

            // return ResponseEntity.ok("Login successful!");
            return ResponseEntity.ok(Map.of("message", "Login successful!"));
        } else {
            return ResponseEntity.status(401).body(Map.of("error", "Invalid email or password"));
        }
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping("/loginStatus")
    public ResponseEntity<String> getUserLoginStatus(@RequestParam("email") String email) {
        // Find user by email
        User user = userRepository.findUserByEmail(email);

        // Check if user is present
        if (user != null) {
            return ResponseEntity.ok(user.getLoginStatus());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping("/get-doctor-id")
    public ResponseEntity<Long> getDoctorId(@RequestParam String email) {
        // Return hardcoded doctor ID
        Doctor doctor = doctorService.getDoctorByEmail(email) ;
        long doctorId = doctor.getId() ;
        return ResponseEntity.ok(doctorId);
    }

}
