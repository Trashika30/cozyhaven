package com.example.cozyhaven.Entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int paymentId;

    private double amount;
    private LocalDate paymentDate;
    private String paymentMethod;
    private String transactionId;
    private String paymentStatus;

    private double refundAmount;
    private LocalDate refundDate;
    private String refundStatus;

    @OneToOne
    @JoinColumn(name = "bookingId")
    private Booking booking;
}