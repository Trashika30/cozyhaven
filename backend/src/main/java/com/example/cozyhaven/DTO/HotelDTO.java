package com.example.cozyhaven.DTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class HotelDTO {

    private int hotelId;
    private String hotelName;
    private String description;
    private String location;
    private String contact;

    private List<String> amenities;

    private int ownerId;
}