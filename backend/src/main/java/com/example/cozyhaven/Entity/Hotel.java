package com.example.cozyhaven.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
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
    @JsonBackReference
    private Owner owner;

    @OneToMany(mappedBy="hotel", cascade = CascadeType.ALL)
    @JsonBackReference
    List<Room> rooms;
  //maps to owner table create ownerId column in hotel

    public Hotel(String hotelName, String description, boolean wifi, boolean parking, String roomService, String location, boolean pool, String contact, String dining, boolean gym,Owner owner,List<Room>rooms) {
        this.hotelName = hotelName;
        this.description = description;
        this.location = location;
        this.contact = contact;
        this.owner = owner;
        this.rooms = rooms;

    }






}
