package com.cringeneers.LDThackathon.service;

import com.cringeneers.LDThackathon.dto.BearerToken;
import com.cringeneers.LDThackathon.dto.LoginDto;
import com.cringeneers.LDThackathon.dto.SignUpDto;
import com.cringeneers.LDThackathon.entity.Role;
import com.cringeneers.LDThackathon.entity.User;
import com.cringeneers.LDThackathon.repository.RoleRepository;
import com.cringeneers.LDThackathon.repository.UserRepository;
import com.cringeneers.LDThackathon.security.JwtUtilities;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;


@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{

    private final AuthenticationManager authenticationManager ;
    private final UserRepository userRepository ;
    private final RoleRepository roleRepository ;
    private final PasswordEncoder passwordEncoder ;
    private final JwtUtilities jwtUtilities ;


    @Override
    public ResponseEntity<?> register(SignUpDto signUpDto) {
        if(userRepository.existsByEmail(signUpDto.getEmail()))
        { return  new ResponseEntity<>("email is already taken !", HttpStatus.SEE_OTHER); }
        else
        { User user = new User();
            user.setName(signUpDto.getName());
            user.setEmail(signUpDto.getEmail());
            user.setOrganisation(signUpDto.getOrganisation());
            user.setInn(signUpDto.getInn());
            user.setWebsite(signUpDto.getWebsite());
            user.setCountry(signUpDto.getCountry());
            user.setCity(signUpDto.getCity());
            user.setBusiness_type(signUpDto.getBusiness_type());
            user.setJob(signUpDto.getJob());
            user.setPassword(passwordEncoder.encode(signUpDto.getPassword()));

            Role roles = roleRepository.findByName("ROLE_USER").get();
            user.setRoles(Collections.singleton(roles));
            userRepository.save(user);
            String token = jwtUtilities.generateToken(signUpDto.getEmail(),Collections.singletonList(roles.getName()));
            return new ResponseEntity<>(new BearerToken(token , "Bearer "),HttpStatus.OK);

        }
    }

    @Override
    public String authenticate(LoginDto loginDto) {
        Authentication authentication= authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginDto.getEmail(),
                        loginDto.getPassword()
                )
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        User user = userRepository.findByEmail(authentication.getName()).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        List<String> rolesNames = new ArrayList<>();
        user.getRoles().forEach(r-> rolesNames.add(r.getName()));
        return jwtUtilities.generateToken(user.getUsername(),rolesNames);
    }
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

}
