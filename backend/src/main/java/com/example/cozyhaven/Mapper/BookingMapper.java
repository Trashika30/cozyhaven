package com.example.cozyhaven.Mapper;

import com.example.cozyhaven.DTO.BookingDTO;
import com.example.cozyhaven.Entity.Booking;
import com.example.cozyhaven.Entity.Room;
import com.example.cozyhaven.Entity.User;

public class BookingMapper {
    public static BookingDTO toDTO(Booking booking){
        if(booking == null) return null;
        BookingDTO dto = new BookingDTO();
        dto.setBookingId(booking.getBookingId());
        dto.setAdultCount(booking.getAdultCount());
        dto.setChildCount(booking.getChildCount());
        dto.setCheckInDate(booking.getCheckInDate());
        dto.setCheckOutDate(booking.getCheckOutDate());
        dto.setTotalAmount(booking.getTotalAmount());
        dto.setStatus(booking.getStatus());
        dto.setCancellationReason(booking.getCancellationReason());
        if(booking.getRoom()!=null){
            dto.setRoomId(booking.getRoom().getRoomId());
            dto.setRoomType(booking.getRoom().getRoomType());

            if(booking.getRoom().getHotel()!=null)
                dto.setHotelName(
                        booking.getRoom().getHotel().getHotelName()
                );

        }
        if(booking.getUser() != null){
            dto.setUserId(booking.getUser().getUserId());
        }
        return dto;
    }

    public static Booking toEntity(BookingDTO dto){
        Booking booking = new Booking();

        booking.setAdultCount(dto.getAdultCount());
        booking.setChildCount(dto.getChildCount());
        booking.setCheckInDate(dto.getCheckInDate());
        booking.setCheckOutDate(dto.getCheckOutDate());
        booking.setTotalAmount(dto.getTotalAmount());
        booking.setStatus(dto.getStatus());
        booking.setCancellationReason(dto.getCancellationReason());
        if(dto.getRoomId() != 0) {
            Room room = new Room();
            room.setRoomId(dto.getRoomId());
            booking.setRoom(room);
        }
        if(dto.getUserId() != 0) {
            User user = new User();
            user.setUserId(dto.getUserId());
            booking.setUser(user);
        }

        return booking;
    }
}
