package com.example.cozyhaven.Service;

import com.example.cozyhaven.Dto.BookingResponse;
import com.example.cozyhaven.Entity.Booking;
import com.example.cozyhaven.Entity.User;
import com.example.cozyhaven.Enum.BookingStatus;
import com.example.cozyhaven.Enum.Role;
import com.example.cozyhaven.Repository.BookingRepo;
import com.example.cozyhaven.Repository.UserRepo;
import org.jspecify.annotations.Nullable;
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

    public List<Booking> showAll() {
        return bookingRepo.findAll();
    }

    public Booking searchBookingById(int id) {
        return bookingRepo.findById(id).orElse(null);
    }

    public List<BookingResponse> getUserBookings(int userId) {
        User customer = userRepo.findByUserIdAndRole(userId, Role.CUSTOMER);
        if(customer == null) return new ArrayList<>();
        return customer.getBookings()
                .stream()
                .map(b -> new BookingResponse(
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
                        b.getStatus().name()
                ))
                .toList();
    }

    public List<BookingResponse> upcomingStay(int userId) {
        User customer = userRepo.findByUserIdAndRole(userId, Role.CUSTOMER);
        if(customer == null) return new ArrayList<>();
        return customer.getBookings()
                .stream()
                .filter(b -> b.getCheckInDate().isAfter(LocalDate.now()))
                .map(b -> new BookingResponse(
                        b.getBookingId(),
                        b.getRoom().getHotel().getHotelName(),
                        b.getRoom().getRoomType(),
                        b.getCheckInDate(),
                        b.getCheckOutDate(),
                        b.getChildCount(),
                        b.getAdultCount(),
                        b.getTotalAmount(),
                        b.getStatus().name()
                ))
                .toList();
    }

    public List<BookingResponse> completedStay(int userId) {
        User customer = userRepo.findByUserIdAndRole(userId, Role.CUSTOMER);
        if(customer == null) return new ArrayList<>();
        return customer.getBookings()
                .stream()
                .filter(b -> b.getCheckOutDate().isBefore(LocalDate.now()))
                .map(b -> new BookingResponse(
                        b.getBookingId(),
                        b.getRoom().getHotel().getHotelName(),
                        b.getRoom().getRoomType(),
                        b.getCheckInDate(),
                        b.getCheckOutDate(),
                        b.getChildCount(),
                        b.getAdultCount(),
                        b.getTotalAmount(),
                        b.getStatus().name()
                ))
                .toList();
    }

    public Booking updateBookingStatus(int userId, BookingStatus status) {
        Booking booking = bookingRepo.findByCustomerId(userId);
        if(booking == null) return null;
        booking.setStatus(status);
        return bookingRepo.save(booking);
    }
}
