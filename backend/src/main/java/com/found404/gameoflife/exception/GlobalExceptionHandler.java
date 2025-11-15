package com.found404.gameoflife.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler
    public ResponseEntity<ErrorResponse> handleApiException(ApiException e) {

        ErrorResponse err = new ErrorResponse(e.getHttpStatus(),
                e.getHttpStatus().value(), e.getMessage(),
                System.currentTimeMillis());

        return new ResponseEntity<>(err, e.getHttpStatus());
    }

    @ExceptionHandler
    public ResponseEntity<ErrorResponse> handleGenericException(Exception e) {

        HttpStatus errStatus = HttpStatus.INTERNAL_SERVER_ERROR;

        ErrorResponse err = new ErrorResponse(errStatus, errStatus.value(),
                e.getMessage(),
                System.currentTimeMillis());

        return new ResponseEntity<>(err, errStatus);
    }
}
