package com.example.cozyhaven.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;


@Data
@AllArgsConstructor
@Entity
public class Owner {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private int ownerId;
        private String firstName;
        private String lastName;
        private String email;
        private String password;
        private String contact;

        @OneToMany(mappedBy = "owner",cascade = CascadeType.ALL)
        List<Hotel> hotels;

        public Owner( String firstName, String lastName, String email, String password, String contact) {
            this.firstName = firstName;
            this.lastName = lastName;
            this.email = email;
            this.password = password;
            this.contact = contact;
        }



}
