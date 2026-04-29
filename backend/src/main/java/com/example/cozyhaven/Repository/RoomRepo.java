package com.example.cozyhaven.Repository;

import com.example.cozyhaven.Entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoomRepo extends JpaRepository<Room, Integer> {

    List<Room> findByHotel_HotelId(int hotelId);

    List<Room> findByRoomType(String roomType);

    List<Room> findByHotel_HotelIdAndAvailableTrue(int hotelId);

    List<Room> findByBaseFareLessThanEqual(double fare);

    List<Room> findByAc(boolean ac);
}