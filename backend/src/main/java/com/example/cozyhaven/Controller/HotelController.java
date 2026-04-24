package com.example.cozyhaven.Controller;


import com.example.cozyhaven.Entity.Hotel;
import com.example.cozyhaven.Entity.Room;
import com.example.cozyhaven.Service.HotelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/hotel")
public class HotelController {

    @Autowired
    HotelService service;

    @PostMapping("/addHotel")
    public ResponseEntity<Hotel> addHotel(@RequestBody Hotel hotel){
        return  ResponseEntity.ok(service.addHotel(hotel));
    }

    @GetMapping("/showAll")
    public ResponseEntity<?> showAllHotels(){
       List<Hotel> hotels = service.showAllHotels();
       if(hotels.isEmpty()){
           return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Hotels not found");
       }
       return ResponseEntity.status(HttpStatus.OK).body(hotels);
    }

    @GetMapping("/searchById/{id}")
    public ResponseEntity<?> searchHotelById(@PathVariable int id){
        Hotel h= service.searchHotelById(id);
        if(h==null){
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Hotel not found");
        }
        return ResponseEntity.status(HttpStatus.OK).body(h);
    }

    @GetMapping("/searchByLocation/{location}")
    public ResponseEntity<?> searchHotelByLocation(@PathVariable String location){
        List<Hotel> h= service.searchHotelByLocation(location);
        if(h.isEmpty()){
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Hotel not found");
        }
        return ResponseEntity.status(HttpStatus.OK).body(h);
    }

    @GetMapping("/searchByOwnerId/{id}")
    public ResponseEntity<?> searchHotelByOwnerId(@PathVariable int id){
        List<Hotel>h= service.searchHotelByOwnerId(id);
        if(h.isEmpty()){
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Hotel not found");
        }
        return ResponseEntity.status(HttpStatus.OK).body(h);
    }


    @PutMapping("updateById/{id}")
    public ResponseEntity<?> updateHotelById(@PathVariable int id, @RequestBody Hotel hotel){
        Hotel h= service.searchHotelById(id);
        if(h==null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Hotel not found");
        }
        else{
           h= service.updateHotelById(id,hotel);
           return ResponseEntity.status(HttpStatus.OK).body(h);
        }

    }

    @DeleteMapping("/deleteById/{id}")
    public ResponseEntity<String> deleteHotelById(@PathVariable int id){
        Hotel h= service.searchHotelById(id);
        if(h==null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Hotel not found");
        }
        else{
             String r=service.deleteHotelById(id);
            return ResponseEntity.status(HttpStatus.OK).body(r);
        }
    }

    @GetMapping("/getRooms/{hotelid}")
    public ResponseEntity<?> getRooms(@PathVariable int hotelid){
        List<Room>rooms=service.getRooms(hotelid);
        if(rooms.isEmpty()){
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Rooms not found");
        }
        return ResponseEntity.status(HttpStatus.OK).body(rooms);
    }

    @PostMapping("/addRooms/{id}")
    public ResponseEntity<?> addRooms(@PathVariable int id,@RequestBody Room room){
        Hotel h= service.searchHotelById(id);
        if(h==null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Hotel not found");
        }
        Room r=service.addRooms(id,room);
        return ResponseEntity.status(HttpStatus.CREATED).body(r);
    }


//    POST /hotel/addHotel

//    GET /hotel/showAll

//    GET /hotel/searchById/{id}

//    GET /hotel/searchByLocation/{location}

//    GET /hotel/searchByOwnerId/{id}

//    PUT /hotel/updateById/{id}

//    DELETE /hotel/deleteById/{id}

//    GET /hotel/getRooms/{hotelid}

//    POST /hotel/addRooms/{id}




}
