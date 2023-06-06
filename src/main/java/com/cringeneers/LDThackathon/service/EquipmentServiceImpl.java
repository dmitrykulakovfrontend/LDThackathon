package com.cringeneers.LDThackathon.service;

import com.cringeneers.LDThackathon.entity.Equipment;
import com.cringeneers.LDThackathon.repository.EquipmentRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class EquipmentServiceImpl implements EquipmentService {
    @Autowired
    private EquipmentRepository equipmentRepository;

    @Override
    public void createEquipment(Equipment equipment) {
        equipmentRepository.save(equipment);
    }

    @Override
    public Equipment getEquipmentByType(String type) {
        return equipmentRepository.findByType(type);
    }

    @Override
    public Optional<Equipment> getEquipment(Long id) {
        return equipmentRepository.findById(id);
    }

    @Override
    public List<Equipment> getAllEquipments() {
        return equipmentRepository.findAll();
    }

    @Override
    public void delete(String type) {
        equipmentRepository.delete(equipmentRepository.findByType(type));
    }
}
