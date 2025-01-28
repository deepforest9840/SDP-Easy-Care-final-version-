// package com.dailycodework.dreamshops.model;

// import jakarta.persistence.*;

// @Entity
// public class User {
    
//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-incrementing ID
//     private long user_id;

//     @Column(nullable = false, unique = true)
//     private String email;

//     @Column(nullable = false)
//     private String password;

//     @Column(nullable = false)
//     private String user_name;

//     private String loginStatus ;

//     public User() {}

//     public User(String email, String password, String user_name) {
//         this.email = email;
//         this.password = password;
//         this.user_name = user_name;
//     }

//     // Getters and Setters
//     public long getUser_id() {
//         return user_id;
//     }

//     public String getEmail() {
//         return email;
//     }

//     public void setEmail(String email) {
//         this.email = email;
//     }

//     public String getPassword() {
//         return password;
//     }

//     public void setPassword(String password) {
//         this.password = password;
//     }

//     public String getUser_name() {
//         return user_name;
//     }

//     public void setUser_name(String user_name) {
//         this.user_name = user_name;
//     }
//     public void setLoginStatus(String status){
//         this.loginStatus = status ; 
//     }
//     public String getLoginStatus()
//     {
//         return this.loginStatus ;
//     }
// }

package com.dailycodework.dreamshops.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-incrementing ID
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String user_name;

    private String loginStatus;
    @JsonIgnore
    @OneToOne(mappedBy = "user", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private Donor donor;



    @JsonIgnore
    @OneToOne(mappedBy = "user", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private UrgentDonor urgentDonor;

    public User() {}

    public User(String email, String password, String user_name) {
        this.email = email;
        this.password = password;
        this.user_name = user_name;
    }

    // Getters and Setters


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUser_name() {
        return user_name;
    }

    public void setUser_name(String user_name) {
        this.user_name = user_name;
    }

    public String getLoginStatus() {
        return loginStatus;
    }

    public void setLoginStatus(String loginStatus) {
        this.loginStatus = loginStatus;
    }

    public Donor getDonor() {
        return donor;
    }

    // public void setDonor(Donor donor) {
    //     this.donor = donor;
    //     donor.setUser(this);
    // }



    public void setDonor(Donor donor) {
        this.donor = donor;
        if (donor != null) {
            donor.setUser(this);
        }
    }
    


    public UrgentDonor getUrgentDonor() {
        return urgentDonor;
    }

    public void setUrgentDonor(UrgentDonor urgentDonor) {
        this.urgentDonor = urgentDonor;
        if (urgentDonor != null) {
            urgentDonor.setUser(this);
        }
    }
}