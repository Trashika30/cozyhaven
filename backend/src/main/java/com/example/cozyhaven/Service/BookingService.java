package com.example.cozyhaven.Service;

import com.example.cozyhaven.DTO.BookingDTO;
import com.example.cozyhaven.Entity.Booking;
import com.example.cozyhaven.Entity.User;
import com.example.cozyhaven.Enum.BookingStatus;
import com.example.cozyhaven.Enum.Role;
import com.example.cozyhaven.Mapper.BookingMapper;
import com.example.cozyhaven.Repository.BookingRepo;
import com.example.cozyhaven.Repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class BookingService {
    @Autowired
    BookingRepo bookingRepo;

    @Autowired
    UserRepo userRepo;

    public Booking addBooking(Booking booking) {
        return bookingRepo.save(booking);
    }

    public List<BookingDTO> showAll() {
        List<Booking> bookingList = bookingRepo.findAll();
        return bookingList.stream().map(BookingMapper::toDTO).toList();
    }

    public BookingDTO searchBookingById(int id) {
        Booking booking = bookingRepo.findById(id).orElse(null);
        return BookingMapper.toDTO(booking);
    }

    public List<BookingDTO> getUserBookings(int userId) {
        User customer = userRepo.findByUserIdAndRole(userId, Role.CUSTOMER);
        if(customer == null) return new ArrayList<>();
        return customer.getBookings()
                .stream()
                .map(b -> new BookingDTO(
                        b.getBookingId(),
                        b.getRoom()
                                .getHotel()
                                .getHotelName(),
                        b.getRoom()
                                .getRoomType(),
                        b.getCheckInDate(),
                        b.getCheckOutDate(),
                        b.getChildCount(),
                        b.getAdultCount(),
                        b.getTotalAmount(),
                        b.getStatus(),
                        b.getRoom().getRoomId()
                ))
                .toList();
    }

    public List<BookingDTO> upcomingStay(int userId) {
        User customer = userRepo.findByUserIdAndRole(userId, Role.CUSTOMER);
        if(customer == null) return new ArrayList<>();
        return customer.getBookings()
                .stream()
                .filter(b -> b.getCheckInDate().isAfter(LocalDate.now()))
                .map(BookingMapper::toDTO)
                .toList();
    }

    public List<BookingDTO> completedStay(int userId) {
        User customer = userRepo.findByUserIdAndRole(userId, Role.CUSTOMER);
        if(customer == null) return new ArrayList<>();
        return customer.getBookings()
                .stream()
                .filter(b -> b.getCheckOutDate().isBefore(LocalDate.now()))
                .map(BookingMapper::toDTO)
                .toList();
    }

    public Booking updateBookingStatus(int userId, BookingStatus status) {
        Booking booking = bookingRepo.findByCustomerId(userId);
        if(booking == null) return null;
        booking.setStatus(status);
        return bookingRepo.save(booking);
    }
}
