package com.found404.gameoflife.service;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.found404.gameoflife.dto.AuthResponseDTO;
import com.found404.gameoflife.entity.User;
import com.found404.gameoflife.mapper.UserMapper;
import com.found404.gameoflife.repository.UserRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class AuthService {

    private final JWTService jwtService;

    AuthenticationManager authManager;

    private final UserRepository userRepository;

    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    private final UserMapper userMapper;

    public AuthResponseDTO register(User user) {
        user.setPassword(encoder.encode(user.getPassword()));
        User newUser = userRepository.save(user);
        return new AuthResponseDTO(jwtService.generateToken(user.getUsername()), userMapper.toDto(newUser));
    }

    public AuthResponseDTO verify(User user) {
        Authentication authentication = authManager
                .authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));
        if (!authentication.isAuthenticated()) {
            throw new RuntimeException("Invalid credentials");
        }

        User dbUser = userRepository.findByUsername(user.getUsername())
                .orElseThrow(() -> new IllegalStateException("User not found after authentication"));

        return new AuthResponseDTO(jwtService.generateToken(user.getUsername()), userMapper.toDto(dbUser));
    }

}
