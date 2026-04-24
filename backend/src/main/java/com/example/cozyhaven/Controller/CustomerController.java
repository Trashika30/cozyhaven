package com.example.cozyhaven.Controller;

import com.example.cozyhaven.Entity.User;
import com.example.cozyhaven.Service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/customer")
public class CustomerController {
    @Autowired
    CustomerService customerService;

    @PostMapping("/resgisterCustomer")
    public ResponseEntity<User> registerCustomer(@ResponseBody User customer){
        return customerService.registerCustomer(customer);
    }
}
