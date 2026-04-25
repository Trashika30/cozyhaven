package com.example.cozyhaven.Mapper;

import com.example.cozyhaven.DTO.UserDTO;
import com.example.cozyhaven.Entity.User;

public class UserMapper {
    public static User toEntity(UserDTO userDTO){
        User user = new User();
        user.setFirstName(userDTO.getFirstName());
        user.setLastName(userDTO.getLastName());
        user.setAge(userDTO);
    }
}
