package com.example.cozyhaven.Controller;
import com.example.cozyhaven.DTO.ReviewDTO;
import org.springframework.web.bind.annotation.RestController;
import com.example.cozyhaven.Entity.Review;
import com.example.cozyhaven.Service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/review")
public class ReviewController {

    @Autowired
    ReviewService service;

    @PostMapping("/addReview")
    public ResponseEntity<ReviewDTO> addReview(@RequestBody ReviewDTO review){
        return ResponseEntity.ok(service.addReview(review));
    }

    @GetMapping("/showAll")
    public ResponseEntity<?> showAllReviews(){
        List<ReviewDTO> reviews = service.showAllReviews();
        if(reviews.isEmpty()){
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Reviews not found");
        }
        return ResponseEntity.status(HttpStatus.OK).body(reviews);
    }

    @GetMapping("/searchById/{id}")
    public ResponseEntity<?> searchReviewById(@PathVariable int id){
        ReviewDTO r = service.searchReviewById(id);
        if(r == null){
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Review not found");
        }
        return ResponseEntity.status(HttpStatus.OK).body(r);
    }

    @GetMapping("/searchByHotelId/{hotelid}")
    public ResponseEntity<?> searchReviewByHotelId(@PathVariable int hotelid){
        List<ReviewDTO> reviews = service.searchReviewByHotelId(hotelid);
        if(reviews.isEmpty()){
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Reviews not found");
        }
        return ResponseEntity.status(HttpStatus.OK).body(reviews);
    }

    @GetMapping("/searchByUserId/{userid}")
    public ResponseEntity<?> searchReviewByUserId(@PathVariable int userid){
        List<ReviewDTO> reviews = service.searchReviewByUserId(userid);
        if(reviews.isEmpty()){
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Reviews not found");
        }
        return ResponseEntity.status(HttpStatus.OK).body(reviews);
    }

    @PutMapping("/editById/{id}")
    public ResponseEntity<?> editReviewById(@PathVariable int id, @RequestBody ReviewDTO review){
        ReviewDTO r = service.searchReviewById(id);
        if(r == null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Review not found");
        }
        else{
            r = service.updateReviewById(id, review);
            return ResponseEntity.status(HttpStatus.OK).body(r);
        }
    }

    @DeleteMapping("/deleteById/{id}")
    public ResponseEntity<String> deleteReviewById(@PathVariable int id){
        ReviewDTO r = service.searchReviewById(id);
        if(r == null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Review not found");
        }
        else{
            String res = service.deleteReviewById(id);
            return ResponseEntity.status(HttpStatus.OK).body(res);
        }
    }

//    POST /review/addReview
//
//    GET /review/showAll
//
//    GET /review/searchById/{id}
//
//    GET /review/searchByHotelId/{hotelid}
//
//    GET /review/searchByUserId/{userid}
//
//    PUT /review/updateById/{id}
//
//    DELETE /review/deleteById/{id}

}