package com.found404.gameoflife.exception.custom;

import org.springframework.http.HttpStatus;

import com.found404.gameoflife.exception.ApiException;

public class BadRequestException extends ApiException {

    public BadRequestException(String message) {
        super(message, HttpStatus.BAD_REQUEST);
    }

}
