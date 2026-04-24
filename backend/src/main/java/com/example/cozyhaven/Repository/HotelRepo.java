package com.example.cozyhaven.Repository;

import com.example.cozyhaven.Entity.Hotel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HotelRepo extends JpaRepository<Hotel, Integer> {

}
