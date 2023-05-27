package com.cringeneers.LDThackathon.repository;

import com.cringeneers.LDThackathon.entity.District;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DistrictRepository extends JpaRepository<District, Long> {
    District findByName(String name);
}
