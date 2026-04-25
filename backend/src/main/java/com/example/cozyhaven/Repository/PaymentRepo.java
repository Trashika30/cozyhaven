package com.example.cozyhaven.Repository;

import com.example.cozyhaven.Entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

public interface PaymentRepo extends JpaRepository<Payment, Long> {
}
