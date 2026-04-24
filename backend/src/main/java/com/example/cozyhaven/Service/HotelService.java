package com.example.cozyhaven.Service;
import com.example.cozyhaven.Entity.Hotel;
import com.example.cozyhaven.Entity.Review;
import com.example.cozyhaven.Entity.Room;
import com.example.cozyhaven.Repository.HotelRepo;
import com.example.cozyhaven.Repository.ReviewRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HotelService {
    @Autowired
    private HotelRepo repo;

    @Autowired
    private ReviewRepo reviewRepo;

    public Hotel addHotel(Hotel hotel) {
        return repo.save(hotel);
    }

    public List<Hotel> showAllHotels() {
        return  repo.findAll();
    }

    public Hotel searchHotelById(int id) {
        return repo.findById(id).orElse(null);
    }

    public Hotel updateHotelById(int id, Hotel hotel) {
        hotel.setHotelId(id);
          return  repo.save(hotel);
    }
    public String deleteHotelById(int id) {
         repo.deleteById(id);
         return "Hotel has been deleted";
    }

    public List<Room> getRooms(int hotelid) {
       return repo.getRooms(hotelid);
    }


    public Room addRooms(int id, Room room) {
        Hotel hotel = searchHotelById(id);
        hotel.getRooms().add(room);
        room.setHotel(hotel);
        repo.save(hotel);
        return room;

    }

    public List<Hotel> searchHotelByLocation(String location) {
        return repo.findAllByLocation(location);
    }

    public List<Hotel> searchHotelByOwnerId(int id) {
        return repo.findAllByOwner_OwnerId(id);
    }

    public List<Review> getReviews(int hotelId) {
        return reviewRepo.findByHotel_HotelId(hotelId);
    }
}




