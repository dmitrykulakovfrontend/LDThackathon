package com.cringeneers.LDThackathon.service;

import com.cringeneers.LDThackathon.entity.Equipment;
import com.cringeneers.LDThackathon.repository.EquipmentRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class EquipmentServiceImpl implements EquipmentService {
    @Autowired
    private EquipmentRepository equipmentRepository;

    @Override
    public Equipment createEquipment(Equipment equipment) {
        return equipmentRepository.save(equipment);
    }

    @Override
    public Equipment getEquipmentByType(String type) {
        return equipmentRepository.findByType(type);
    }

    @Override
    public List<Equipment> getAllEquipments() {
        return equipmentRepository.findAll();
    }

    @Override
    public void update(String type, Equipment equipment) {
        Equipment equipmentFromDb = equipmentRepository.findByType(type);
        equipmentFromDb.setType(equipment.getType());
        equipmentFromDb.setCost(equipment.getCost());
        equipmentRepository.save(equipmentFromDb);
    }

    @Override
    public void delete(String type) {
        equipmentRepository.delete(equipmentRepository.findByType(type));
    }
}
