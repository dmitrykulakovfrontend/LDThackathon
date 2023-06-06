package com.cringeneers.LDThackathon.repository;

import com.cringeneers.LDThackathon.entity.Equipment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EquipmentRepository extends JpaRepository<Equipment, Long> {
    Equipment findByType(String type);
}
