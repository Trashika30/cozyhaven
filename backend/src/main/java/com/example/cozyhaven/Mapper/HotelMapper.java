package com.example.cozyhaven.Mapper;

import com.example.cozyhaven.DTO.HotelDTO;
import com.example.cozyhaven.Entity.Hotel;

public class HotelMapper {

    public static Hotel toEntity(HotelDTO hoteldto) {
        Hotel h = new Hotel();
        h.setHotelName(hoteldto.getHotelName());
        h.setDescription(hoteldto.getDescription());
        h.setLocation(hoteldto.getLocation());
        h.setContact(hoteldto.getContact());
        h.setImageUrl(hoteldto.getImageUrl());
        h.setAmenities(hoteldto.getAmenities());
        h.setReviews(hoteldto.getReviews());
        h.setRatings(hoteldto.getRatings());
        h.setStandard(hoteldto.getStandard());
        h.setDeluxe(hoteldto.getDeluxe());
        h.setSuite(hoteldto.getSuite());
        //dont set owner object here it is detaching

        return h;
    }

    public static HotelDTO toDto(Hotel hotel) {
        if (hotel == null) {
            return null;
        }
        HotelDTO dto = new HotelDTO();
        dto.setHotelId(hotel.getHotelId());
        dto.setHotelName(hotel.getHotelName());
        dto.setDescription(hotel.getDescription());
        dto.setLocation(hotel.getLocation());
        dto.setContact(hotel.getContact());
        dto.setReviews(hotel.getReviews());
        dto.setImageUrl(hotel.getImageUrl());
        dto.setAmenities(hotel.getAmenities());
        dto.setRatings(hotel.getRatings());
        dto.setStandard(hotel.getStandard());
        dto.setDeluxe(hotel.getDeluxe());
        dto.setSuite(hotel.getSuite());

        if (hotel.getOwner() != null) { //to avoid null pointer excep
            dto.setOwnerId(hotel.getOwner().getUserId());
        }
        return dto;
    }
}
