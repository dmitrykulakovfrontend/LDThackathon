package com.cringeneers.LDThackathon.service;

import com.cringeneers.LDThackathon.dto.LoginDto;
import com.cringeneers.LDThackathon.dto.SignUpDto;
import com.cringeneers.LDThackathon.entity.Role;
import com.cringeneers.LDThackathon.entity.User;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface UserService {

    String authenticate(LoginDto loginDto);
    ResponseEntity<?> register (SignUpDto registerDto);
    Role saveRole(Role role);

    User saveUser (User user) ;

    List<User> getAllUsers();
}
