package com.example.cozyhaven.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int customerId;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String contact;

    @OneToMany(mappedBy="customer", cascade=CascadeType.ALL)
    @JsonBackReference
    private List<Booking> bookings;
}
