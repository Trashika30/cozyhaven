package com.example.cozyhaven.DTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class HotelDTO {

    private Integer hotelId;//becoz when entity is autoincrement user wont sent id then this is null in dto int cant be null prbm
    private String hotelName;
    private String description;
    private String location;
    private String contact;

    private List<String> amenities;


    private int ownerId;
}