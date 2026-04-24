package com.example.cozyhaven.Service;


import com.example.cozyhaven.Entity.Review;
import com.example.cozyhaven.Repository.ReviewRepo;
import org.jspecify.annotations.Nullable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepo repo;


    public Review addReview(Review review) {
        return repo.save(review);
    }

    public List<Review> showAllReviews() {
        return repo.findAll();
    }

    public Review searchReviewById(int id) {
        return repo.findById(id).orElse(null);
    }


    public List<Review> searchReviewByHotelId(int hotelid) {
        return repo.findByHotel_HotelId(hotelid);
    }


    public List<Review> searchReviewByUserId(int userid) {
        return repo.findByCustomer_UserId(userid);
    }


    public Review updateReviewById(int id, Review review) {
            Review r=repo.findById(id).orElse(null);
            if(r!=null) return repo.save(review);

            return null;

    }


    public String deleteReviewById(int id) {
        Review r=repo.findById(id).orElse(null);
        if(r!=null) {
            repo.deleteById(id);
            return "Review has been deleted";
        }
        return "No such review found";
    }
}
