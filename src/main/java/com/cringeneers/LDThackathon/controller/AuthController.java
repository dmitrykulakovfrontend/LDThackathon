package com.cringeneers.LDThackathon.controller;

import com.cringeneers.LDThackathon.dto.LoginDto;
import com.cringeneers.LDThackathon.dto.SignUpDto;
import com.cringeneers.LDThackathon.entity.Role;
import com.cringeneers.LDThackathon.entity.User;
import com.cringeneers.LDThackathon.repository.RoleRepository;
import com.cringeneers.LDThackathon.repository.UserRepository;
import com.cringeneers.LDThackathon.service.UserService;
import com.cringeneers.LDThackathon.service.UserServiceImpl;
import jakarta.servlet.http.Cookie;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

@CrossOrigin
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;
    private final UserService userService;

    @PostMapping("/signin")
    public String authenticate(@RequestBody LoginDto loginDto){
        return userService.authenticate(loginDto);
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody @Valid SignUpDto signUpDto){
        return userService.register(signUpDto);
    }
}
