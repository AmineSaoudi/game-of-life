package com.found404.gameoflife.service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.found404.gameoflife.config.DbUserPrincipal;
import com.found404.gameoflife.entity.User;
import com.found404.gameoflife.repository.UserRepository;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class DbUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("user not found"));

        return new DbUserPrincipal(user);
    }

}
