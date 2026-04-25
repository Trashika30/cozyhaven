package com.example.cozyhaven.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReviewDTO {

    private int id;
    private double rating;
    private String comment;
    private LocalDate reviewDate;

    private int customerId;
    private int hotelId;
}