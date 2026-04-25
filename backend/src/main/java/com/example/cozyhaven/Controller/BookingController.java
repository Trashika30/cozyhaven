package com.example.cozyhaven.Controller;

import com.example.cozyhaven.DTO.BookingDTO;
import com.example.cozyhaven.Entity.Booking;
import com.example.cozyhaven.Enum.BookingStatus;
import com.example.cozyhaven.Service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/booking")
public class BookingController {
    @Autowired
    BookingService bookingService;

    @PostMapping("/addBooking")
    public ResponseEntity<BookingDTO> addBooking(@RequestBody BookingDTO booking){
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(bookingService.addBooking(booking));
    }

    @GetMapping("/showAll")
    public ResponseEntity<List<BookingDTO>> showAll(){
        return ResponseEntity.status(HttpStatus.FOUND).body(bookingService.showAll());
    }

    @GetMapping("/searchById/{id}")
    public ResponseEntity<?> searchBookingById(@PathVariable int id){
        BookingDTO booking = bookingService.searchBookingById(id);
        if(booking == null) return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Booking not found!!!");
        return ResponseEntity.status(HttpStatus.FOUND).body(booking);
    }

    @GetMapping("/getUserBookings/{userId}")
    public ResponseEntity<?> getUserBookings(@PathVariable int userId){
        List<BookingDTO> bookingList = bookingService.getUserBookings(userId);
        if(bookingList.isEmpty())
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No bookings made!!!");
        return ResponseEntity.status(HttpStatus.FOUND).body(bookingList);
    }

    @GetMapping("/upcomingStay/{userId}")
    public ResponseEntity<?> upcomingStay(@PathVariable int userId){
        List<BookingDTO> bookingList = bookingService.upcomingStay(userId);
        if(bookingList.isEmpty())
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No upcoming bookings found!!!");
        return ResponseEntity.status(HttpStatus.FOUND).body(bookingList);
    }

    @GetMapping("/completedStay/{userId}")
    public ResponseEntity<?> completedStay(@PathVariable int userId){
        List<BookingDTO> bookingList = bookingService.completedStay(userId);
        if(bookingList.isEmpty())
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No completed bookings found!!!");
        return ResponseEntity.status(HttpStatus.FOUND).body(bookingList);       }

    @PutMapping("/updateBookingStatus/{userId}/{status}")
    public ResponseEntity<?> updateBookingStatus(@PathVariable int userId, @PathVariable BookingStatus status){
        BookingDTO booking = bookingService.updateBookingStatus(userId, status);
        if(booking == null) return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No bookings found!!!");
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(booking);
    }

    //refund methods needed

}

// POST /booking/createBooking
//
// GET /booking/showAll
//
// GET /booking/{bookingId}
//
// GET /booking/user/{userId}
//
// GET /booking/upcoming/{userId}
//
// GET /booking/completed/{userId}
//
// PUT /booking/status/{bookingId}/{status}
//
// PUT /booking/cancel/{bookingId}
//
// DELETE /booking/delete/{bookingId}
