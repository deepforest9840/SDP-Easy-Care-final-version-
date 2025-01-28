package com.dailycodework.dreamshops.model;

public class UserBuilder {

    private String email    ; 
    private String password ; 
    private String user_name ;

    public UserBuilder(){
        
    }
    
    public String getEmail() {
        return email;
    }
    public String getPassword() {
        return password;
    }
    public String getUser_name() {
        return user_name;
    }
    
    public UserBuilder setEmail(String email) {
        this.email = email;
        return this ;
    }
    public UserBuilder setPassword(String password) {
        this.password = password;
        return this ;
    }
    public UserBuilder setUser_name(String user_name) {
        this.user_name = user_name;
        return this ;
    }

    public User getUser(){
        return new User(email,password,user_name) ;
    }

    

}
