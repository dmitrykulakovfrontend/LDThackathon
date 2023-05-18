package com.cringeneers.LDThackathon.repository;

import com.cringeneers.LDThackathon.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {

    Role findByName(String name);
}
