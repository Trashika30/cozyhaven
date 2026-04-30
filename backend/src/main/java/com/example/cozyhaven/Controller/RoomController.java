package com.example.cozyhaven.Controller;

import com.example.cozyhaven.ApiResponse.ApiResponse;
import com.example.cozyhaven.DTO.RoomDTO;
import com.example.cozyhaven.Exception.ResourceNotFoundException;
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

    @GetMapping("/all/getRooms/{hotelId}")
    public ResponseEntity<?> getRooms(@PathVariable int hotelId){
        List<RoomDTO> rooms = service.getRooms(hotelId);

        if(rooms.isEmpty()){
           throw new ResourceNotFoundException("Room Not Found");
        }

        return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse<>("Rooms",HttpStatus.OK,rooms));
    }

    @PostMapping("/owner/addRoom")
    public ResponseEntity<?> addRoom(@Valid @RequestBody RoomDTO room){
        RoomDTO r = service.addRoom(room);

        if(r == null){
            throw new ResourceNotFoundException("No such hotel");
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(new ApiResponse<>("Room added ! ",HttpStatus.OK,r));
    }

    @GetMapping("/all/searchRoomByType/{type}")
    public ResponseEntity<?> searchRoomByType(@PathVariable String type){
        List<RoomDTO> rooms = service.searchRoomByType(type);

        if(rooms.isEmpty()){
          throw new ResourceNotFoundException("Rooms Not Found");
        }

        return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse<>("Rooms",HttpStatus.OK,rooms));
    }

    @GetMapping("/all/searchRoomById/{id}")
    public ResponseEntity<?> searchRoomById(@PathVariable int id) {
        RoomDTO room = service.searchRoomById(id);

        if (room == null) {
            throw new ResourceNotFoundException("Room Not Found");
        }

        return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse<>("Room found",HttpStatus.OK,room));
    }

    @GetMapping("/all/searchAvailableRooms/{hotelId}")
    public ResponseEntity<?> searchAvailableRooms(@PathVariable int hotelId){
        List<RoomDTO> rooms = service.searchAvailableRooms(hotelId);

        if(rooms.isEmpty()){
            throw new ResourceNotFoundException("Rooms Not Found");
         }

        return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse<>("Rooms",HttpStatus.OK,rooms));
    }

    @GetMapping("/all/searchRoomByFare/{fare}")
    public ResponseEntity<?> searchRoomByFare( @Positive(message = "Base fare cannot be 0 or less") @PathVariable double fare){
        List<RoomDTO> rooms = service.searchRoomByFare(fare);

        if(rooms.isEmpty()){
           throw new ResourceNotFoundException("Rooms Not Found");
        }

        return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse<>("Rooms",HttpStatus.OK,rooms));
    }

    @GetMapping("/all/searchRoomByAc/{ac}")
    public ResponseEntity<?> searchRoomByAc(@PathVariable boolean ac){
        List<RoomDTO> rooms = service.searchRoomByAc(ac);

        if(rooms.isEmpty()){
            throw new  ResourceNotFoundException("Rooms Not Found");
        }

        return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse<>("Rooms",HttpStatus.OK,rooms));
    }

    @PutMapping("/owner/updateRoomById/{id}")
    public ResponseEntity<?> updateRoomById(@PathVariable int id, @Valid @RequestBody RoomDTO room){
        RoomDTO r = service.updateRoomById(id, room);

        if(r == null){
           throw new ResourceNotFoundException("Room Not Found");
        }

        return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse<>("Room updated !",HttpStatus.OK,r));
    }

    @DeleteMapping("/owner/deleteRoomById/{id}")
    public ResponseEntity<?> deleteRoomById(@PathVariable int id){
        int  result = service.deleteRoomById(id);
        if(result == 0){
            throw new ResourceNotFoundException("Room Not Found");
        }
        return ResponseEntity.status(HttpStatus.GONE).body(new ApiResponse<>("Room deleted !",HttpStatus.GONE,result));
    }
}