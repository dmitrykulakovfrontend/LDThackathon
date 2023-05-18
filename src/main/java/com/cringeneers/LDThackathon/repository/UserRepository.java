package com.cringeneers.LDThackathon.repository;

import com.cringeneers.LDThackathon.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByEmail(String email);

}
