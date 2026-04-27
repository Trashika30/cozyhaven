package com.example.cozyhaven.Entity;

import com.example.cozyhaven.Enum.Role;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.aspectj.bridge.IMessage;
import org.hibernate.validator.constraints.Range;

import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userId;
    @NotBlank(message = "First name cannot be empty")
    private String firstName;
    @NotBlank(message = "Last name cannot be empty")
    private String lastName;
    @Range(min = 1, max = 120)
    private int age;
    private String gender;
    @Column(unique = true)
    @Email
    private String email;
    @Size(min = 6  , max=16 ,message = "Password not satisfied")
    private String password;
    private String contact;
    private String address;

    @Enumerated(EnumType.STRING)
    private Role role;

    @OneToMany(mappedBy="customer", cascade=CascadeType.ALL)
    @JsonManagedReference("user_bookings") //Avoids Dependency Loop - Parent -> ManagedReference
    private List<Booking> bookings;

    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL)
    @JsonManagedReference("owner_hotels") //Avoids Dependency Loop - Parent -> ManagedReference
    List<Hotel> hotels;
}
