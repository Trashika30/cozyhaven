package com.example.cozyhaven.DTO;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RoomDTO {
    private int roomId;
    private String roomType;
    private int maxOccupy;
    private double baseFare;
    private boolean isAc;
    private boolean available;
    private int hotelId;

    public RoomDTO(String roomType, int maxOccupy, double baseFare, boolean isAc,
                   boolean available, int hotelId) {
        this.roomType = roomType;
        this.maxOccupy = maxOccupy;
        this.baseFare = baseFare;
        this.isAc = isAc;
        this.available = available;
        this.hotelId = hotelId;
    }
}
