package com.found404.gameoflife.exception.custom;

import org.springframework.http.HttpStatus;

import com.found404.gameoflife.exception.ApiException;

public class NotFoundException extends ApiException {

    public NotFoundException(String message) {
        super(message, HttpStatus.NOT_FOUND);
    }

}
