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
    private HotelService service;

    @PostMapping("/add")
    public Hotel addHotel(@RequestBody Hotel hotel) {
        return service.addHotel;
    }

    @GetMapping("/showall")
    public List<Hotel> showAllHotels() {
        return service.showAllHotels();
    }

    @PutMapping("/update")
    public Hotel updateHotel(@RequestBody Hotel hotel) {

    }

}
