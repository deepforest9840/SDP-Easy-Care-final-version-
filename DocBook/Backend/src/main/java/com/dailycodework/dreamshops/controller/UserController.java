package com.dailycodework.dreamshops.controller;


import com.dailycodework.dreamshops.dto.DoctorDto;
import com.dailycodework.dreamshops.exceptions.ResourceNotFoundException;
import com.dailycodework.dreamshops.model.Appointment;
import com.dailycodework.dreamshops.model.Doctor;
import com.dailycodework.dreamshops.model.User;
import com.dailycodework.dreamshops.model.UserBuilder;
import com.dailycodework.dreamshops.repository.UserRepository;
import com.dailycodework.dreamshops.request.AddDoctorRequest;
import com.dailycodework.dreamshops.request.DoctorUpdateRequest;
import com.dailycodework.dreamshops.response.ApiResponse;
import com.dailycodework.dreamshops.service.doctor.IDoctorService;
import com.dailycodework.dreamshops.service.user.UserService;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

import static org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR;
import static org.springframework.http.HttpStatus.NOT_FOUND;

@RequiredArgsConstructor
@RestController
@RequestMapping("${api.prefix}/user")
public class UserController {

     @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository ;

    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@RequestBody UserBuilder userbuilder) {
        try {
            //+− _=            
            User user = userbuilder.getUser() ;

            userService.saveUser(user);
            return ResponseEntity.ok(Map.of("message","User signed up successfully!"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message","Error: " + e.getMessage()));
        }
    }

    @GetMapping("/getUser")
    public ResponseEntity<User> getAppointments(@RequestParam("email") String email) {
        User user = userRepository.findUserByEmail(email) ;
        return ResponseEntity.ok(user);
    }



    

   
}
