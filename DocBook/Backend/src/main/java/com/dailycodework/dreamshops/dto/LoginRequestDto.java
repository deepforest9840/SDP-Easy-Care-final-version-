package com.dailycodework.dreamshops.dto;

import jakarta.persistence.Column;
import lombok.Data;

@Data
public class LoginRequestDto {


    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    public LoginRequestDto(){}
    public LoginRequestDto(String email,String password){
        this.email = email ;
        this.password = password ;
    }


    public void setEmail(String email)
    {
        this.email = email ;
    }
    public void setPassword(String password){
        this.password = password ;
    }

    public String getEmail(){
        return this.email ;
    }
    public String getPassword(){
        return this.password ;
    }

    
}
