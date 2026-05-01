package com.example.cozyhaven.DTO;

import com.example.cozyhaven.Enum.BookingStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookingDTO {
    private Integer bookingId;
    private String hotelName;
    private String roomType;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    private int childCount;
    private int adultCount;
    private double totalAmount;
    private BookingStatus status;
    private int roomId;
    private int userId;
    private String cancellationReason;


    public BookingDTO(String hotelName, String roomType, LocalDate checkInDate,
                      LocalDate checkOutDate, int childCount, int adultCount,
                      double totalAmount, BookingStatus status, int roomId) {
        this.hotelName = hotelName;
        this.roomType = roomType;
        this.checkInDate = checkInDate;
        this.checkOutDate = checkOutDate;
        this.childCount = childCount;
        this.adultCount = adultCount;
        this.totalAmount = totalAmount;
        this.status = status;
        this.roomId = roomId;
    }
}