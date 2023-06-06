package com.cringeneers.LDThackathon.service;

import com.cringeneers.LDThackathon.entity.Equipment;

import java.util.List;
import java.util.Optional;

public interface EquipmentService {
    void createEquipment(Equipment equipment);
    Equipment getEquipmentByType(String type);
    Optional<Equipment> getEquipment(Long id);
    List<Equipment> getAllEquipments();

    void delete(String type);
}
