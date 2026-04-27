package com.example.cozyhaven.Exception;


import com.example.cozyhaven.ApiResponse.ApiResponse;
import jakarta.validation.ConstraintViolationException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;


import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ApiResponse<Object>> handleNotFound(ResourceNotFoundException ex) {


        return ResponseEntity.status(HttpStatus.NOT_FOUND.value())
                .body(new ApiResponse<>(ex.getMessage(), HttpStatus.NOT_FOUND, null));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class) //For adding methods
    public ResponseEntity<ApiResponse<Map<String, String>>>
    handleValidationExceptions(MethodArgumentNotValidException e){
        Map<String, String> errors = new HashMap<>();
        e.getBindingResult().getFieldErrors().forEach(error -> errors.put(error.getField(),
                error.getDefaultMessage()));

        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(new ApiResponse<>("Invalid Input", HttpStatus.BAD_REQUEST, errors));
    }

    @ExceptionHandler(ConstraintViolationException.class) //For update methods
    public ResponseEntity<Map<String, String>>
    handleValidationException(ConstraintViolationException e){
        Map<String, String> errors = new HashMap<>();
        e.getConstraintViolations().forEach(error -> {
            String field = error.getPropertyPath().toString();
            String message = error.getMessage();
            errors.put(field, message);
        });

        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(DataIntegrityViolationException.class) //For Email Uniqueness
    public ResponseEntity<ApiResponse<Object>> handleDuplicate(
            DataIntegrityViolationException ex){

        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(new ApiResponse<>("Email already exists", HttpStatus.CONFLICT, null));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<Object>> handleGeneral(Exception ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ApiResponse<>("Something went wrong", HttpStatus.INTERNAL_SERVER_ERROR, null));
    }
}