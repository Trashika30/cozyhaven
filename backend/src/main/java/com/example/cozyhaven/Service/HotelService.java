package com.example.cozyhaven.Service;
import com.example.cozyhaven.DTO.HotelDTO;
import com.example.cozyhaven.DTO.RoomDTO;
import com.example.cozyhaven.Entity.Hotel;
import com.example.cozyhaven.Entity.Review;
import com.example.cozyhaven.Entity.Room;
import com.example.cozyhaven.Mapper.HotelMapper;
import com.example.cozyhaven.Mapper.RoomMapper;
import com.example.cozyhaven.Repository.HotelRepo;
import com.example.cozyhaven.Repository.ReviewRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class HotelService {
    @Autowired
    private HotelRepo repo;

    @Autowired
    private ReviewRepo reviewRepo;

    public HotelDTO addHotel(HotelDTO hotel) {

        Hotel h=HotelMapper.toEntity(hotel);
        Hotel h1=repo.save(h);
        return HotelMapper.toDto(h1);

    }

    public List<HotelDTO> showAllHotels() {

        List<Hotel>list=repo.findAll();
        List<HotelDTO> listDTO=new ArrayList<>();
        for(Hotel h:list){
            listDTO.add(HotelMapper.toDto(h));
        }
        return listDTO;
    }

    public HotelDTO searchHotelById(int id) {
        Hotel h= repo.findById(id).orElse(null);
        if(h==null){return null;}
        return HotelMapper.toDto(h);
    }

    public HotelDTO updateHotelById(int id, Hotel hotel) {
           hotel.setHotelId(id);
           Hotel h= repo.save(hotel);
           return HotelMapper.toDto(h);

    }
    public String deleteHotelById(int id) {
         repo.deleteById(id);
         return "Hotel has been deleted";
    }



    public List<HotelDTO> searchHotelByLocation(String location) {
        List<Hotel>list= repo.findAllByLocation(location);
        List<HotelDTO> listDTO=new ArrayList<>();
        for(Hotel h:list){
            listDTO.add(HotelMapper.toDto(h));
        }
        return listDTO;
    }

    public List<HotelDTO> searchHotelByOwnerId(int id) {
        List<Hotel>list= repo.findAllByOwner_OwnerId(id);
        List<HotelDTO> listDTO=new ArrayList<>();
        for(Hotel h:list){
            listDTO.add(HotelMapper.toDto(h));
        }
        return listDTO;
    }


}




