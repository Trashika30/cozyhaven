package com.example.cozyhaven.Controller;


import com.example.cozyhaven.Entity.Hotel;
import com.example.cozyhaven.Service.HotelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/hotel")


public class HotelController {

    @Autowired
    HotelService service;


    @PostMapping("/addHotel")
    public Hotel addHotel(@RequestBody Hotel dto){
        return service.addHotel(dto);
    }

    @GetMapping("/showall")
    public List<Hotel> showAllHotels(){
        return service.showAllHotels();
    }

    @GetMapping("/searchbyid/{id}")
    public Hotel searchHotelById(@PathVariable int id){
        return service.searchHotelById(id);
    }

    @PutMapping("updatebyid/{id}")
    public Hotel updateHotelById(@PathVariable int id, @RequestBody Hotel hotel){
        return service.updateHotelById(id,hotel);
    }

    @DeleteMapping("/deletebyid/{id}")
    public void deleteHotelById(@PathVariable int id){
        return service.deleteHotelById(id);
    }

}
