package com.example.cozyhaven.Service;

import com.example.cozyhaven.DTO.RoomDTO;
import com.example.cozyhaven.Entity.Hotel;
import com.example.cozyhaven.Entity.Room;
import com.example.cozyhaven.Mapper.RoomMapper;
import com.example.cozyhaven.Repository.HotelRepo;
import com.example.cozyhaven.Repository.RoomRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RoomService {

    @Autowired
    RoomRepo roomRepo;

    @Autowired
    HotelRepo hotelRepo;

    public List<RoomDTO> getRooms(int hotelId){
        List<Room> list = roomRepo.findByHotel_HotelId(hotelId);

        List<RoomDTO> dtoList = new ArrayList<>();
        for(Room r : list){
            dtoList.add(RoomMapper.toDto(r));
        }
        return dtoList;
    }

    public RoomDTO addRoom(int hotelId, RoomDTO roomDTO){
        Hotel hotel = hotelRepo.findById(hotelId).orElse(null);

        if(hotel == null){
            return null;
        }

        Room room = RoomMapper.toEntity(roomDTO);
        room.setHotel(hotel);

        Room saved = roomRepo.save(room);

        return RoomMapper.toDto(saved);
    }

    public List<RoomDTO> searchRoomByType(String type){
        List<Room> list = roomRepo.findByRoomType(type);

        List<RoomDTO> dtoList = new ArrayList<>();
        for(Room r : list){
            dtoList.add(RoomMapper.toDto(r));
        }
        return dtoList;
    }

    public RoomDTO searchRoomById(int id){
        Room room = roomRepo.findById(id).orElse(null);

        if(room == null){
            return null;
        }

        return RoomMapper.toDto(room);
    }

    public List<RoomDTO> searchAvailableRooms(int hotelId){
        List<Room> list = roomRepo.findByHotel_HotelIdAndAvailableTrue(hotelId);

        List<RoomDTO> dtoList = new ArrayList<>();
        for(Room r : list){
            dtoList.add(RoomMapper.toDto(r));
        }
        return dtoList;
    }

    public List<RoomDTO> searchRoomByFare(double fare){
        List<Room> list = roomRepo.findByBaseFareLessThanEqual(fare);

        List<RoomDTO> dtoList = new ArrayList<>();
        for(Room r : list){
            dtoList.add(RoomMapper.toDto(r));
        }
        return dtoList;
    }

    public List<RoomDTO> searchRoomByAc(boolean isAc){
        List<Room> list = roomRepo.findByIsAc(isAc);

        List<RoomDTO> dtoList = new ArrayList<>();
        for(Room r : list){
            dtoList.add(RoomMapper.toDto(r));
        }
        return dtoList;
    }

    public RoomDTO updateRoomById(int id, RoomDTO roomDTO){
        Room room = RoomMapper.toEntity(roomDTO);
        room.setRoomId(id);

        Room updated = roomRepo.save(room);

        return RoomMapper.toDto(updated);
    }

    public int deleteRoomById(int id){
        Room room = roomRepo.findById(id).orElse(null);
        if(room == null){
            return 0;
        }
        roomRepo.deleteById(id);
        return 1;
    }
}