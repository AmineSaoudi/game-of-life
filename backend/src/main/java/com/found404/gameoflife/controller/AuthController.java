package com.found404.gameoflife.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.found404.gameoflife.config.DbUserPrincipal;
import com.found404.gameoflife.dto.AuthResponseDTO;
import com.found404.gameoflife.entity.User;
import com.found404.gameoflife.service.AuthService;

import lombok.AllArgsConstructor;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.found404.gameoflife.dto.UserResponseDTO;
import com.found404.gameoflife.mapper.UserMapper;

@AllArgsConstructor
@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;
    private final UserMapper userMapper;

    @PostMapping("/register")
    public AuthResponseDTO register(@RequestBody User user) {
        return authService.register(user);
    }

    @PostMapping("/login")
    public AuthResponseDTO login(@RequestBody User user) {
        return authService.verify(user);
    }

    @GetMapping("/me")
    public UserResponseDTO me(@AuthenticationPrincipal DbUserPrincipal principal) {
        return userMapper.toDto(principal.getUser());
    }

}
