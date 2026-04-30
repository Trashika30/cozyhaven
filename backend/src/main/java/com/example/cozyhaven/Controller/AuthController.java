package com.example.cozyhaven.Controller;


import com.example.cozyhaven.ApiResponse.ApiResponse;
import com.example.cozyhaven.DTO.UserDTO;
import com.example.cozyhaven.Entity.User;
import com.example.cozyhaven.Service.UserService;
import com.example.cozyhaven.Util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;


@RequiredArgsConstructor //similar to autowired it requires variables to be private final
@RestController
@RequestMapping("/auth")
public class AuthController {


    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;


    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody UserDTO user){

        String email=user.getEmail();
        String password=user.getPassword();

        UserDTO user1=userService.findUserByEmail(email);
        if(user1!=null){
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new ApiResponse<>( "Email already exists", HttpStatus.CONFLICT,null));
        }


        user.setPassword(passwordEncoder.encode(password));
        userService.registerUser(user);


        return ResponseEntity.status(HttpStatus.CREATED).body(new ApiResponse<>("User registered successfully", HttpStatus.CREATED,null));
    }


    @PostMapping("/login/{email}/{password}")
    public ResponseEntity<?> login(@PathVariable String email, @PathVariable String password) {

        UserDTO user = userService.findUserByEmail(email);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ApiResponse<>("User not registered", HttpStatus.UNAUTHORIZED, null));
        }

        if (!passwordEncoder.matches(password, user.getPassword()))
            return new ResponseEntity<>("Invalid member", HttpStatus.UNAUTHORIZED);


            String token = jwtUtil.generateToken(email, user.getRole());//token assigned to frontend

        return new ResponseEntity<>(Map.of("token", token), HttpStatus.OK);// token to postman
    }
    

}
