package com.example.cozyhaven.Service;

import com.example.cozyhaven.Entity.User;
import com.example.cozyhaven.Repository.CustomerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class CustomerService {
    @Autowired
    CustomerRepo customerRepo;

    public ResponseEntity<User> registerCustomer(User customer) {
        User c = customerRepo.findByEmail(customer.getEmail());
        if(c != null) ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("Email already exists!!");
        customerRepo.save(c);
        return ResponseEntity.status(HttpStatus.OK).body(c);
    }
}
