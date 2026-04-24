package com.example.cozyhaven.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Hotel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int hotelId;
    private String hotelName;
    private String description;
    private String location;
    private String contact;

    @ElementCollection
    private List<String> amenities; //wifi, parking, roomService, pool, dining, gym

    @ManyToOne
    @JoinColumn(name="ownerId")
    @JsonBackReference("owner_hotels") //Avoids Dependency Loop - Child -> BackReference
    private User owner;

    @OneToMany(mappedBy = "hotel", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Review> reviews;

    @OneToMany(mappedBy="hotel", cascade = CascadeType.ALL)
    @JsonManagedReference //Avoids Dependency Loop - Parent -> ManagedReference
    List<Room> rooms;

    public Hotel(String hotelName,
                 String description,
                 String location,
                 String contact,
                 List<String> amenities,
                 User owner) {
        this.hotelName = hotelName;
        this.description = description;
        this.location = location;
        this.contact = contact;
        this.amenities = amenities;
        this.owner = owner;
    }






}