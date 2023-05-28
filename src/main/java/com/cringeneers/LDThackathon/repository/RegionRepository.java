package com.cringeneers.LDThackathon.repository;

import com.cringeneers.LDThackathon.entity.Region;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RegionRepository extends JpaRepository<Region, Long> {
    Region findByName(String name);
}
