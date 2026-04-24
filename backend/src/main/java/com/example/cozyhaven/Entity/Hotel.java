package com.example.cozyhaven.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@Entity
@AllArgsConstructor
public class Hotel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String hotelName;
    private String description;
    private boolean wifi;
    private boolean parking;
    private String roomService;
    private String location;
    private boolean pool;
    private String contact;
    private  String dining;
    private boolean gym;

    @ManyToOne
    @JoinColumn(name="owner_id")
    @JsonIgnore
    private Owner owner;

    @OneToMany(mappedBy="hotel")
    @JsonIgnore
    List<Room>rooms;
  //maps to owner table create ownerid column in hotel
    public Hotel() {}

    public Hotel(String hotelName, String description, boolean wifi, boolean parking, String roomService, String location, boolean pool, String contact, String dining, boolean gym,Owner owner,List<Room>rooms) {
        this.hotelName = hotelName;
        this.description = description;
        this.wifi = wifi;
        this.parking = parking;
        this.roomService = roomService;
        this.location = location;
        this.pool = pool;
        this.contact = contact;
        this.dining = dining;
        this.gym = gym;
        this.owner = owner;
        this.rooms = rooms;

    }






}
