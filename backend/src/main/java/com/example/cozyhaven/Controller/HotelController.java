package com.example.cozyhaven.Controller;


import com.example.cozyhaven.ApiResponse.ApiResponse;
import com.example.cozyhaven.DTO.HotelDTO;
import com.example.cozyhaven.Entity.Hotel;
import com.example.cozyhaven.Exception.ResourceNotFoundException;
import com.example.cozyhaven.Service.HotelService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/hotel")
@Validated //validate parameters in methods.
public class HotelController {

    @Autowired
    HotelService service;

    @PostMapping("/addHotel")
    public ResponseEntity<?> addHotel(@Valid @RequestBody HotelDTO dto){

        return  ResponseEntity.status(HttpStatus.CREATED).body(new ApiResponse<>("Hotel added ! ",HttpStatus.CREATED,service.addHotel(dto)));
    }

    @GetMapping("/showAll")
    public ResponseEntity<?> showAllHotels(){
       List<HotelDTO> hotels = service.showAllHotels();
       if(hotels.isEmpty()){
          throw  new ResourceNotFoundException("No Hotels found");
       }
       return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse<>("Hotels found ",HttpStatus.OK,hotels));
    }

    @GetMapping("/searchById/{id}")
    public ResponseEntity<?> searchHotelById(@PathVariable int id){
        HotelDTO h= service.searchHotelById(id);
        if(h==null){
            throw new ResourceNotFoundException("Hotel not found");
        }
        return ResponseEntity.status(HttpStatus.OK).body(new  ApiResponse<>("Hotel found ",HttpStatus.OK,h));
    }

    @GetMapping("/searchByLocation/{location}")
    public ResponseEntity<?> searchHotelByLocation(@NotNull(message = "Location cannot be empty") @PathVariable String location){
        List<HotelDTO> h= service.searchHotelByLocation(location);
        if(h.isEmpty()){
          throw  new ResourceNotFoundException("Hotel not found");
        }
        return ResponseEntity.status(HttpStatus.OK).body(new  ApiResponse<>("Hotel found ",HttpStatus.OK,h));
    }

    @GetMapping("/searchByOwnerId/{id}")
    public ResponseEntity<?> searchHotelByOwnerId(@PathVariable int id){
        List<HotelDTO>h= service.searchHotelByOwnerId(id);
        if(h.isEmpty()){
            throw  new ResourceNotFoundException("Hotel not found");
        }
        return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse<>("Hotel found: ",HttpStatus.OK,h));
    }


    @PutMapping("updateById/{id}")
    public ResponseEntity<?> updateHotelById(@PathVariable int id, @RequestBody Hotel hotel){
        HotelDTO h= service.searchHotelById(id);
        if(h==null){
           throw  new ResourceNotFoundException("Hotel not found");
        }
        else{
           h= service.updateHotelById(id,hotel);
           return ResponseEntity.status(HttpStatus.OK).body(new  ApiResponse<>("Hotel updated ",HttpStatus.OK,h));
        }

    }

    @DeleteMapping("/deleteById/{id}")
    public ResponseEntity<?> deleteHotelById(@PathVariable int id){
        HotelDTO h= service.searchHotelById(id);
        if(h==null){
            throw new ResourceNotFoundException("Hotel not found");
        }
        else{
             String r=service.deleteHotelById(id);
            return ResponseEntity.status(HttpStatus.GONE).body(new ApiResponse<>("Hotel deleted",HttpStatus.GONE,r));
        }
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
