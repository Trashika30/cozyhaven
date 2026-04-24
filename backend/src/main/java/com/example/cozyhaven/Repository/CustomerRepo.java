package com.example.cozyhaven.Repository;

import com.example.cozyhaven.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepo extends JpaRepository<User, Integer> {
        User findByEmail(String email);
}
