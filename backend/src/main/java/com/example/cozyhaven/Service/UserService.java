package com.example.cozyhaven.Service;

import com.example.cozyhaven.DTO.UserDTO;
import com.example.cozyhaven.Entity.User;
import com.example.cozyhaven.Enum.Role;
import com.example.cozyhaven.Mapper.UserMapper;
import com.example.cozyhaven.Repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    UserRepo userRepo;

    public UserDTO registerUser(UserDTO user) {
       User u = userRepo.save(UserMapper.toEntity(user));
       return UserMapper.toDTO(u);
    }

    public List<UserDTO> showAllCustomers() {
        List<User> customerList = userRepo.findAllByRole(Role.CUSTOMER);
        return customerList.stream().map(UserMapper::toDTO).toList();
    }

    public List<UserDTO> showAllOwners() {
        List<User> ownerList = userRepo.findAllByRole(Role.OWNER);
        return ownerList.stream().map(UserMapper::toDTO).toList();
    }

    public UserDTO searchCustomer(int id) {
        User customer = userRepo.findByUserIdAndRole(id, Role.CUSTOMER);
        return UserMapper.toDTO(customer);
    }

    public UserDTO searchOwner(int id) {
        User owner = userRepo.findByUserIdAndRole(id, Role.OWNER);
        return UserMapper.toDTO(owner);
    }

    public void deleteCustomer(int id) {
        userRepo.deleteById(id);
    }

    public void deleteOwner(int id) {
        userRepo.deleteById(id);
    }
}
