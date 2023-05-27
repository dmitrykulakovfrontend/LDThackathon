package com.cringeneers.LDThackathon.service;

import com.cringeneers.LDThackathon.entity.Business;
import com.cringeneers.LDThackathon.entity.Equipment;

public interface EquipmentService {
    Equipment createEquipment(Equipment equipment);
    Equipment getEquipmentByType(String type);
}
