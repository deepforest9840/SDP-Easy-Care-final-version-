package com.dailycodework.dreamshops.service.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dailycodework.dreamshops.dto.LoginRequestDto;
import com.dailycodework.dreamshops.dto.LoginStatusDto;
import com.dailycodework.dreamshops.model.User;
import com.dailycodework.dreamshops.repository.LoginStatusRepository;
import com.dailycodework.dreamshops.repository.UserRepository;


@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository ;

    @Autowired
    private LoginStatusRepository loginStatusRepository ;

    public boolean checkLoginCredentials(LoginRequestDto loginRequestDto) {
        // Retrieve the user by email
        User user = userRepository.findUserByEmail(loginRequestDto.getEmail());

        // Validate user and password
        if (user != null) {
            if(user.getEmail().equals(loginRequestDto.getEmail()) && user.getPassword().equals(loginRequestDto.getPassword())){
                return true ;
            }
            else return false ;
        }

        return false;
    }
    
    // this function is used to store user's login history .
    public void saveLoginStatus(LoginStatusDto loginStatusDto)
    {
        loginStatusRepository.save(loginStatusDto);
    }

    // this function update login status where user loged in or loged out .
    public void updateUserStatus(String email, String status) {
        userRepository.updateUserLoginStatus(status, email);
    }
    
}
