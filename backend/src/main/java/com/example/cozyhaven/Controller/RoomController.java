package com.example.cozyhaven.Controller;

import com.example.cozyhaven.DTO.RoomDTO;
import com.example.cozyhaven.Service.RoomService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Positive;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/room")
@Validated //validate parameters in methods.
public class RoomController {

    @Autowired
    RoomService service;

    @GetMapping("/getRooms/{hotelId}")
    public ResponseEntity<?> getRooms(@PathVariable int hotelId){
        List<RoomDTO> rooms = service.getRooms(hotelId);

        if(rooms.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Rooms not found");
        }

        return ResponseEntity.status(HttpStatus.OK).body(rooms);
    }

    @PostMapping("/addRoom/{hotelId}")
    public ResponseEntity<?> addRoom(@PathVariable int hotelId, @Valid @RequestBody RoomDTO room){
        RoomDTO r = service.addRoom(hotelId, room);

        if(r == null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Hotel not found");
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(r);
    }

    @GetMapping("/searchRoomByType/{type}")
    public ResponseEntity<?> searchRoomByType(@PathVariable String type){
        List<RoomDTO> rooms = service.searchRoomByType(type);

        if(rooms.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Rooms not found");
        }

        return ResponseEntity.status(HttpStatus.OK).body(rooms);
    }

    @GetMapping("/searchRoomById/{id}")
    public ResponseEntity<?> searchRoomById(@PathVariable int id){
        RoomDTO room = service.searchRoomById(id);

        if(room == null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Room not found");
        }

        return ResponseEntity.status(HttpStatus.OK).body(room);
    }

    @GetMapping("/searchAvailableRooms/{hotelId}")
    public ResponseEntity<?> searchAvailableRooms(@PathVariable int hotelId){
        List<RoomDTO> rooms = service.searchAvailableRooms(hotelId);

        if(rooms.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No available rooms");
        }

        return ResponseEntity.status(HttpStatus.OK).body(rooms);
    }

    @GetMapping("/searchRoomByFare/{fare}")
    public ResponseEntity<?> searchRoomByFare( @Positive(message = "Base fare cannot be 0 or less") @PathVariable double fare){
        List<RoomDTO> rooms = service.searchRoomByFare(fare);

        if(rooms.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Rooms not found");
        }

        return ResponseEntity.status(HttpStatus.OK).body(rooms);
    }

    @GetMapping("/searchRoomByAc/{isAc}")
    public ResponseEntity<?> searchRoomByAc(@PathVariable boolean isAc){
        List<RoomDTO> rooms = service.searchRoomByAc(isAc);

        if(rooms.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Rooms not found");
        }

        return ResponseEntity.status(HttpStatus.OK).body(rooms);
    }

    @PutMapping("/updateRoomById/{id}")
    public ResponseEntity<?> updateRoomById(@PathVariable int id, @Valid @RequestBody RoomDTO room){
        RoomDTO r = service.updateRoomById(id, room);

        if(r == null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Room not found");
        }

        return ResponseEntity.status(HttpStatus.OK).body(r);
    }

    @DeleteMapping("/deleteRoomById/{id}")
    public ResponseEntity<?> deleteRoomById(@PathVariable int id){
        String result = service.deleteRoomById(id);

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }
}