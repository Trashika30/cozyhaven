package com.example.cozyhaven.Controller;

import com.example.cozyhaven.Entity.User;
import com.example.cozyhaven.Enum.Role;
import com.example.cozyhaven.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    UserService userService;

    @PostMapping("/registerUser")
    public ResponseEntity<?> registerUser(@RequestBody User user){
        User u = userService.searchCustomerByEmail(user.getEmail());
        if(u != null) return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("Email already exists!!");
        return ResponseEntity.status(HttpStatus.OK).body(userService.registerUser(user));
    }

    @GetMapping("/showAllCustomers")
    public ResponseEntity<List<User>> showAllCustomers(){
        return ResponseEntity.status(HttpStatus.FOUND).body(userService.showAllCustomers());
    }

    @GetMapping("/showAllOwners")
    public ResponseEntity<List<User>> showAllOwners(){
        return ResponseEntity.status(HttpStatus.FOUND).body(userService.showAllOwners());
    }

    @GetMapping("searchCustomer/{id}")
    public ResponseEntity<?> searchCustomer(@PathVariable int id){
        User customer = userService.searchCustomer(id);
        if(customer != null)
            return ResponseEntity.status(HttpStatus.FOUND).body(customer);
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Customer not found!!!");
    }

    @GetMapping("searchOwner/{id}")
    public ResponseEntity<?> searchOwner(@PathVariable int id){
        User owner = userService.searchOwner(id);
        if(owner != null)
            return ResponseEntity.status(HttpStatus.FOUND).body(owner);
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Owner not found!!!");
    }

    @DeleteMapping("/deleteCustomer/{id}")
    public ResponseEntity<?> deleteCustomer(@PathVariable int id){
        User customer = userService.searchCustomer(id);
        if(customer == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Customer not found!!!");
        userService.deleteCustomer(id);
        return ResponseEntity.status(HttpStatus.FOUND).body("Customer deleted!!!");
    }

    @DeleteMapping("/deleteOwner/{id}")
    public ResponseEntity<?> deleteOwner(@PathVariable int id){
        User owner = userService.searchOwner(id);
        if(owner == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Owner not found!!!");
        userService.deleteOwner(id);
        return ResponseEntity.status(HttpStatus.FOUND).body("Owner deleted!!!");
    }
}

// POST /user/registerUser
//
// GET /user/showAllCustomers
//
// GET /user/showAllOwners
//
// GET /user/searchCustomer/{id}
//
// GET /user/searchOwner/{id}
//
// DELETE /user/deleteCustomer/{id}
//
// DELETE /user/deleteOwner/{id}