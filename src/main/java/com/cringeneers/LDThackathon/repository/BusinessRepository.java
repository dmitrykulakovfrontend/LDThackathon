package com.cringeneers.LDThackathon.repository;

import com.cringeneers.LDThackathon.entity.Business;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BusinessRepository extends JpaRepository<Business, Long> {
    Business findByType(String type);
}
