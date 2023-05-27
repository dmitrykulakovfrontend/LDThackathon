package com.cringeneers.LDThackathon.repository;

import com.cringeneers.LDThackathon.entity.District;
import com.cringeneers.LDThackathon.entity.Region;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.ArrayList;

public interface RegionRepository extends JpaRepository<Region, Long> {
    Region findByName(String name);
}
