package com.found404.gameoflife.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.found404.gameoflife.dto.UserResponseDTO;
import com.found404.gameoflife.mapper.UserMapper;
import com.found404.gameoflife.repository.UserRepository;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("/users")
public class UserController {

    private final UserRepository userRepository;
    private final UserMapper mapper;

    @GetMapping
    public List<UserResponseDTO> getUsers() {
        return mapper.toDtos(userRepository.findAll());
    }

}
