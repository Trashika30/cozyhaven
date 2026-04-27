package com.example.cozyhaven.Controller;

import com.example.cozyhaven.ApiResponse.ApiResponse;
import com.example.cozyhaven.DTO.UserDTO;
import com.example.cozyhaven.Entity.User;
import com.example.cozyhaven.Enum.Role;
import com.example.cozyhaven.Service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.AutoPopulatingList;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@Validated //validate parameters in methods.
public class UserController {
    @Autowired
    UserService userService;

    @PostMapping("/registerUser")
    public ResponseEntity<ApiResponse<?>> registerUser(@Valid @RequestBody UserDTO user){
        UserDTO u = userService.searchUserByEmail(user.getEmail());
        return ResponseEntity.status(HttpStatus.OK).body(
                new ApiResponse<>("User Registered Successfully!!!", HttpStatus.OK, u)
        );
    }

    @GetMapping("/showAllCustomers")
    public ResponseEntity<ApiResponse<List<UserDTO>>> showAllCustomers(){
        return ResponseEntity.status(HttpStatus.FOUND).body(
                new ApiResponse<>("All customers fetched successfully", HttpStatus.FOUND, userService.showAllCustomers())
        );
    }

    @GetMapping("/showAllOwners")
    public ResponseEntity<List<UserDTO>> showAllOwners(){
        return ResponseEntity.status(HttpStatus.FOUND).body(userService.showAllOwners());
    }

    @GetMapping("searchCustomer/{id}")
    public ResponseEntity<?> searchCustomer(@PathVariable int id){
        UserDTO customer = userService.searchCustomer(id);
        if(customer != null)
            return ResponseEntity.status(HttpStatus.FOUND).body(customer);
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Customer not found!!!");
    }

    @GetMapping("searchOwner/{id}")
    public ResponseEntity<?> searchOwner(@PathVariable int id){
        UserDTO owner = userService.searchOwner(id);
        if(owner != null)
            return ResponseEntity.status(HttpStatus.FOUND).body(owner);
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Owner not found!!!");
    }

    @DeleteMapping("/deleteCustomer/{id}")
    public ResponseEntity<?> deleteCustomer(@PathVariable int id){
        UserDTO customer = userService.searchCustomer(id);
        if(customer == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Customer not found!!!");
        userService.deleteCustomer(id);
        return ResponseEntity.status(HttpStatus.FOUND).body("Customer deleted!!!");
    }

    @DeleteMapping("/deleteOwner/{id}")
    public ResponseEntity<?> deleteOwner(@PathVariable int id){
        UserDTO owner = userService.searchOwner(id);
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