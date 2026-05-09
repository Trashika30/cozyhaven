package com.example.cozyhaven.DTO;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class HotelDTO {

    private Integer hotelId;//becoz when entity is autoincrement user wont sent id then this is null in dto int cant be null prbm
    private String hotelName;
    private String description;
    private String location;
    private String contact;
    private String imageUrl;

    private List<String> amenities;

    private int ownerId;
}
