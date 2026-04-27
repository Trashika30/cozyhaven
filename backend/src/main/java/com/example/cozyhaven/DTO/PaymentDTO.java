package com.example.cozyhaven.DTO;

import lombok.*;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaymentDTO {

    private Integer paymentId;
    private double amount;
    private LocalDate paymentDate;
    private String paymentMethod;
    private String transactionId;
    private String paymentStatus;

    private double refundAmount;
    private LocalDate refundDate;
    private String refundStatus;

    private int bookingId;
}