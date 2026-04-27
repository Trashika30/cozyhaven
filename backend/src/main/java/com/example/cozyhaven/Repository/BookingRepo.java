package com.example.cozyhaven.Repository;

import com.example.cozyhaven.Entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookingRepo extends JpaRepository<Booking, Integer> {
    //List<Booking> findByCustomerUserId(int userId);

}
