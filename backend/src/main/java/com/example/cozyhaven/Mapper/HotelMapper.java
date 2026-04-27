package com.example.cozyhaven.Mapper;

import com.example.cozyhaven.DTO.HotelDTO;
import com.example.cozyhaven.Entity.Hotel;
import com.example.cozyhaven.Entity.User;


public class HotelMapper {
    public static Hotel toEntity(HotelDTO hoteldto) {
        Hotel h=new Hotel();
        h.setHotelName(hoteldto.getHotelName());
        h.setDescription(hoteldto.getDescription());
        h.setLocation(hoteldto.getLocation());
        h.setContact(hoteldto.getContact());
        h.setAmenities(hoteldto.getAmenities());
        //dont set owner object here it is detaching

        return h;
    }


    public static HotelDTO toDto(Hotel hotel)
    {
        HotelDTO dto=new HotelDTO();
        dto.setHotelId(hotel.getHotelId());
        dto.setHotelName(hotel.getHotelName());
        dto.setDescription(hotel.getDescription());
        dto.setLocation(hotel.getLocation());
        dto.setContact(hotel.getContact());
        dto.setAmenities(hotel.getAmenities());

        if(hotel.getOwner()!=null){ //to avoid null pointer excep
            dto.setOwnerId(hotel.getOwner().getUserId());
        }
        return dto;
    }
}
