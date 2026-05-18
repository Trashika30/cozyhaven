package com.example.cozyhaven.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.cozyhaven.Entity.Booking;

public interface BookingRepo extends JpaRepository<Booking, Integer> {

    List<Booking> findByHotelId(int hotelId);

}
