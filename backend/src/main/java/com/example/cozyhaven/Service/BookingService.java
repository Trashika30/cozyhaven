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

    public BookingDTO addBooking(BookingDTO booking1) {
        Booking booking =BookingMapper.toEntity(booking1);
        booking.setBookingDate(LocalDate.now());
        booking.setStatus(BookingStatus.CONFIRMED);

        double baseFare = booking.getRoom().getBaseFare();
        double total = baseFare;

        int extraPeople = (booking.getAdultCount() + booking.getChildCount())
                - booking.getRoom().getMaxOccupy();

        if(extraPeople > 0){
            total += extraPeople * (baseFare * 0.4);
        }

        booking.setTotalAmount(total);

        booking= bookingRepo.save(booking);
        return BookingMapper.toDTO(booking);
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
                .stream().map(BookingMapper::toDTO)
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

    public BookingDTO updateBookingStatus(int bookingId, BookingStatus status) {
        Booking booking = bookingRepo.findById(bookingId).orElse(null);
        if(booking == null) return null;
        booking.setStatus(status);
        return BookingMapper.toDTO(bookingRepo.save(booking));
    }

    public Booking cancelBooking(int bookingId, String reason){
        Booking b = bookingRepo.findById(bookingId).orElse(null);
        if(b==null){
            return null;
        }

        b.setStatus(BookingStatus.CANCELLED);
        b.setCancellationReason(reason);

        return bookingRepo.save(b);
    }

}
