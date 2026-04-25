package com.example.cozyhaven.Repository;

import com.example.cozyhaven.Entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookingRepo extends JpaRepository<Booking, Integer> {
    Booking findByCustomerId(int userId);
}
