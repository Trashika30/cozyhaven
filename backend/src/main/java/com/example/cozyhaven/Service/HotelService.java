package com.example.cozyhaven.Service;
import com.example.cozyhaven.Entity.Hotel;
import com.example.cozyhaven.Repository.HotelRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class HotelService {
    @Autowired
    private HotelRepo repo;

    public Hotel addHotel(Hotel hotel) {
        return repo.save(hotel);
    }

}
