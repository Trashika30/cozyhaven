package com.example.cozyhaven.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int roomId;
    private String roomType;
    private int maxOccupy;
    private double baseFare;
    private boolean isAc;
    private boolean available;

    @ManyToOne
    @JoinColumn(name = "hotelId")
    @JsonBackReference //Avoids Dependency Loop - Child -> BackReference
    Hotel hotel;

    public Room(String roomType, int maxOccupy, boolean isAc, double baseFare,
                boolean available, Hotel hotel) {
        this.roomType = roomType;
        this.maxOccupy = maxOccupy;
        this.isAc = isAc;
        this.baseFare = baseFare;
        this.available = available;
        this.hotel = hotel;
    }
}
