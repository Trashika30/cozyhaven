
package com.example.cozyhaven.Controller;

import com.example.cozyhaven.ApiResponse.ApiResponse;
import com.example.cozyhaven.DTO.PaymentDTO;
import com.example.cozyhaven.Exception.ResourceNotFoundException;
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
    public ResponseEntity<ApiResponse<?>> makePayment(@PathVariable int bookingId, @RequestBody PaymentDTO dto){
        PaymentDTO p = service.makePayment(bookingId,dto);
        if(p==null){
            throw new ResourceNotFoundException("Booking not found");
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(
                new ApiResponse<>("Payment Success", HttpStatus.CREATED, p)
        );
    }

    @GetMapping("/showAll")
    public ResponseEntity<ApiResponse<?>> showAll(){
        List<PaymentDTO> list = service.getAllPayments();
        if(list.isEmpty())
            throw new ResourceNotFoundException("No payment made");
        return ResponseEntity.status(HttpStatus.OK).body(
                new ApiResponse<>("All payment fetched", HttpStatus.OK, list)
        );
    }

    @GetMapping("/searchById/{id}")
    public ResponseEntity<ApiResponse<?>> searchPaymentById(@PathVariable int id){
        PaymentDTO p = service.searchPaymentById(id);
        if(p==null){
            throw new ResourceNotFoundException("Payment not found!!");
        }
        return ResponseEntity.status(HttpStatus.OK).body(
                new ApiResponse<>("Payment found", HttpStatus.OK, p)
        );
    }

    @GetMapping("/searchByBookingId/{bookingId}")
    public ResponseEntity<ApiResponse<?>> searchPaymentByBookingId(@PathVariable int bookingId){
        List<PaymentDTO> list = service.searchPaymentByBookingId(bookingId);
        if(list.isEmpty()){
            throw new ResourceNotFoundException("Payment not found");
        }
        return ResponseEntity.status(HttpStatus.OK).body(
                new ApiResponse<>("Payment found", HttpStatus.OK, list)
        );
    }

    @PutMapping("/updatePaymentStatus/{id}/{status}")
    public ResponseEntity<ApiResponse<?>> updatePaymentStatus(@PathVariable int id,@PathVariable String status){
        PaymentDTO p = service.updatePaymentStatus(id,status);
        if(p==null){
            throw new ResourceNotFoundException("Payment not found");
        }
        return ResponseEntity.status(HttpStatus.OK).body(
                new ApiResponse<>("Payment updated", HttpStatus.OK, p)
        );
    }

    @PutMapping("/requestRefund/{id}")
    public ResponseEntity<ApiResponse<?>> requestRefund(@PathVariable int id){
        PaymentDTO p = service.requestRefund(id);
        if(p==null){
            throw new ResourceNotFoundException("Payment not found");
        }
        return ResponseEntity.status(HttpStatus.OK).body(
                new ApiResponse<>("Request submitted", HttpStatus.OK, p)
        );
    }

    @PutMapping("/approveRefund/{id}")
    public ResponseEntity<?> approveRefund(@PathVariable int id){
        PaymentDTO p = service.approveRefund(id);
        if(p==null){
            throw new ResourceNotFoundException("Payment not found");
        }
        return ResponseEntity.status(HttpStatus.OK).body(
                new ApiResponse<>("Refund approved", HttpStatus.OK, p)
        );
    }

    @PutMapping("/rejectRefund/{id}")
    public ResponseEntity<?> rejectRefund(@PathVariable int id){
        PaymentDTO p = service.rejectRefund(id);
        if(p==null){
            throw new ResourceNotFoundException("Payment not found");
        }
        return ResponseEntity.status(HttpStatus.OK).body(
                new ApiResponse<>("Refund rejected", HttpStatus.OK, p)
        );
    }

    @PutMapping("/refundPayment/{id}")
    public ResponseEntity<?> refundPayment(@PathVariable int id){
        PaymentDTO p = service.refundPayment(id);
        if(p==null){
            throw new ResourceNotFoundException("Payment not found");
        }
        return ResponseEntity.status(HttpStatus.OK).body(
                new ApiResponse<>("Refund success", HttpStatus.OK, p)
        );
    }
}