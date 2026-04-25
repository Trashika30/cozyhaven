
package com.example.cozyhaven.Controller;

import com.example.cozyhaven.DTO.PaymentDTO;
import com.example.cozyhaven.Service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/payment")
public class PaymentController {

    @Autowired
    PaymentService service;

    @PostMapping("/makePayment/{bookingId}")
    public ResponseEntity<?> makePayment(@PathVariable int bookingId, @RequestBody PaymentDTO dto){
        PaymentDTO p = service.makePayment(bookingId,dto);
        if(p==null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Booking not found");
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(p);
    }

    @GetMapping("/showAll")
    public ResponseEntity<?> showAll(){
        List<PaymentDTO> list = service.getAllPayments();
        if(list.isEmpty()){
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Payments not found");
        }
        return ResponseEntity.status(HttpStatus.OK).body(list);
    }

    @GetMapping("/searchById/{id}")
    public ResponseEntity<?> searchPaymentById(@PathVariable int id){
        PaymentDTO p = service.searchPaymentById(id);
        if(p==null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Payment not found");
        }
        return ResponseEntity.status(HttpStatus.OK).body(p);
    }

    @GetMapping("/searchByBookingId/{bookingId}")
    public ResponseEntity<?> searchPaymentByBookingId(@PathVariable int bookingId){
        List<PaymentDTO> list = service.searchPaymentByBookingId(bookingId);
        if(list.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Payment not found");
        }
        return ResponseEntity.status(HttpStatus.OK).body(list);
    }

    @PutMapping("/updatePaymentStatus/{id}/{status}")
    public ResponseEntity<?> updatePaymentStatus(@PathVariable int id,@PathVariable String status){
        PaymentDTO p = service.updatePaymentStatus(id,status);
        if(p==null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Payment not found");
        }
        return ResponseEntity.status(HttpStatus.OK).body(p);
    }

    @PutMapping("/requestRefund/{id}")
    public ResponseEntity<?> requestRefund(@PathVariable int id){
        PaymentDTO p = service.requestRefund(id);
        if(p==null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Payment not found");
        }
        return ResponseEntity.status(HttpStatus.OK).body(p);
    }

    @PutMapping("/approveRefund/{id}")
    public ResponseEntity<?> approveRefund(@PathVariable int id){
        PaymentDTO p = service.approveRefund(id);
        if(p==null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Payment not found");
        }
        return ResponseEntity.status(HttpStatus.OK).body(p);
    }

    @PutMapping("/rejectRefund/{id}")
    public ResponseEntity<?> rejectRefund(@PathVariable int id){
        PaymentDTO p = service.rejectRefund(id);
        if(p==null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Payment not found");
        }
        return ResponseEntity.status(HttpStatus.OK).body(p);
    }

    @PutMapping("/refundPayment/{id}")
    public ResponseEntity<?> refundPayment(@PathVariable int id){
        PaymentDTO p = service.refundPayment(id);
        if(p==null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Payment not found");
        }
        return ResponseEntity.status(HttpStatus.OK).body(p);
    }
}