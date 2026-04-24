package com.example.cozyhaven.Service;

import com.example.cozyhaven.Entity.User;
import com.example.cozyhaven.Enum.Role;
import com.example.cozyhaven.Repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    UserRepo userRepo;

    public User searchCustomerByEmail(String email) {
        return userRepo.findByEmail(email);
    }

    public User registerUser(User user) {
       return userRepo.save(user);
    }

    public List<User> showAllCustomers() {
       return userRepo.findAllByRole(Role.CUSTOMER);
    }

    public List<User> showAllOwners() {
        return userRepo.findAllByRole(Role.OWNER);
    }

    public User searchCustomer(int id) {
        return userRepo.findByUserIdAndRole(id, Role.CUSTOMER);
    }

    public User searchOwner(int id) {
        return userRepo.findByUserIdAndRole(id, Role.OWNER);
    }

    public void deleteCustomer(int id) {
        userRepo.deleteById(id);
    }

    public void deleteOwner(int id) {
        userRepo.deleteById(id);
    }


}
