package com.cringeneers.LDThackathon.service;

import com.cringeneers.LDThackathon.entity.Business;
import com.cringeneers.LDThackathon.entity.Equipment;
import com.cringeneers.LDThackathon.entity.User;

import java.util.List;

public interface EquipmentService {
    Equipment createEquipment(Equipment equipment);
    Equipment getEquipmentByType(String type);
    List<Equipment> getAllEquipments();
    void update(String type, Equipment equipment);

    void delete(String type);
}
