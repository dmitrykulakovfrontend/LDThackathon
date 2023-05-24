//package com.cringeneers.LDThackathon.service;
//
//import com.cringeneers.LDThackathon.entity.User;
//import com.cringeneers.LDThackathon.repository.RoleRepository;
//import com.cringeneers.LDThackathon.repository.UserRepository;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//
//@Service
//public class UserServiceImpl implements UserService {
//
//    private UserRepository userRepository;
//    private RoleRepository roleRepository;
//    private PasswordEncoder passwordEncoder;
//
//    public UserServiceImpl(UserRepository userRepository,
//                           RoleRepository roleRepository,
//                           PasswordEncoder passwordEncoder) {
//        this.userRepository = userRepository;
//        this.roleRepository = roleRepository;
//        this.passwordEncoder = passwordEncoder;
//    }
//
//    @Override
//    public void saveUser(UserDto userDto) {
//
//    }
//
//    @Override
//    public User findUserByEmail(String email) {
//        return null;
//    }
//
//    @Override
//    public List<UserDto> findAllUsers() {
//        return null;
//    }
//}