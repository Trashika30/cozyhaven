package com.example.cozyhaven.Controller;

import com.example.cozyhaven.ApiResponse.ApiResponse;
import com.example.cozyhaven.DTO.BookingDTO;
import com.example.cozyhaven.Entity.Booking;
import com.example.cozyhaven.Enum.BookingStatus;
import com.example.cozyhaven.Exception.ResourceNotFoundException;
import com.example.cozyhaven.Service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.lang.module.ResolutionException;
import java.util.List;

@RestController
@RequestMapping("/booking")
public class BookingController {
    @Autowired
    BookingService bookingService;

    @PostMapping("/customer/addBooking")
    public ResponseEntity<ApiResponse<BookingDTO>> addBooking(@RequestBody BookingDTO booking){
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(new ApiResponse<>("Booking added!",HttpStatus.FOUND,bookingService.addBooking(booking)));
    }

    @GetMapping("/admin/showAll")
    public ResponseEntity<ApiResponse<List<BookingDTO>>> showAll()  {
        List<BookingDTO> list = bookingService.showAll();
        if(list.isEmpty()) throw new ResourceNotFoundException("No Bookings found");
        return ResponseEntity.status(HttpStatus.FOUND).body(new ApiResponse<>("Bookings found!",HttpStatus.OK,list));
    }

    @GetMapping("/all/searchById/{id}")
    public ResponseEntity<?> searchBookingById(@PathVariable int id) {
        BookingDTO booking = bookingService.searchBookingById(id);
        if(booking == null) throw new ResourceNotFoundException("Booking not found");
        return ResponseEntity.status(HttpStatus.FOUND).body(new ApiResponse<>("Booking detail for id:"+id,HttpStatus.FOUND,booking));
    }

    @GetMapping("/customer/getUserBookings/{userId}")
    public ResponseEntity<?> getUserBookings(@PathVariable int userId){
        List<BookingDTO> bookingList = bookingService.getUserBookings(userId);
        if(bookingList.isEmpty())
            throw new ResourceNotFoundException("Booking not found");
        return ResponseEntity.status(HttpStatus.FOUND).body(new ApiResponse<>("Bookings detail for user id:"+userId,HttpStatus.FOUND,bookingList));
    }

    @GetMapping("/customer/upcomingStay/{userId}")
    public ResponseEntity<?> upcomingStay(@PathVariable int userId){
        List<BookingDTO> bookingList = bookingService.upcomingStay(userId);
        if(bookingList.isEmpty())
            throw new ResourceNotFoundException("Booking not found");
        return ResponseEntity.status(HttpStatus.FOUND).body(new ApiResponse<>("Upcoming plans: ",HttpStatus.FOUND,bookingList));
    }

    @GetMapping("/customer/completedStay/{userId}")
    public ResponseEntity<?> completedStay(@PathVariable int userId){
        List<BookingDTO> bookingList = bookingService.completedStay(userId);
        if(bookingList.isEmpty())
            throw new ResourceNotFoundException("No completed bookings found!!!");
        return ResponseEntity.status(HttpStatus.FOUND).body(new ApiResponse<>("Completed stays : ",HttpStatus.FOUND,bookingList));
    }

    @PutMapping("/owner/updateBookingStatus/{bookingId}/{status}")
    public ResponseEntity<?> updateBookingStatus(@PathVariable int bookingId, @PathVariable BookingStatus status){
        BookingDTO booking = bookingService.updateBookingStatus(bookingId, status);
        if(booking == null)
            throw new ResourceNotFoundException("Booking not found!!!");
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse<>("Updated Booking !",HttpStatus.NOT_FOUND,booking));
    }

    @PutMapping("/customer/cancelBooking/{bookingId}/{reason}")
    public ResponseEntity<?> cancelBooking(@PathVariable int bookingId,@PathVariable String reason){
        Booking b = bookingService.cancelBooking(bookingId,reason);
        if(b==null){
            throw new ResourceNotFoundException("Booking not found!!!");
        }
        return ResponseEntity.status(HttpStatus.GONE).body(new ApiResponse<>("Cancelled Booking !",HttpStatus.GONE,b));
    }



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
