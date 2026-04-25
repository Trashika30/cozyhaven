package com.example.cozyhaven.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookingResponse {
    private int bookingId;
    private String hotelName;
    private String roomType;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    private int childCount;
    private int adultCount;
    private double totalAmount;
    private String status;
}