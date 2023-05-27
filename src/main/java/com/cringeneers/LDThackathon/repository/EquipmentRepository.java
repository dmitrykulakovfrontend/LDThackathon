package com.cringeneers.LDThackathon.repository;

import com.cringeneers.LDThackathon.entity.Equipment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EquipmentRepository extends JpaRepository<Equipment, Long> {
    Equipment findByType(String type);
}
