package com.cringeneers.LDThackathon.dto;

import lombok.Data;

import java.util.ArrayList;

@Data
public class InvestRequestDto {
    public String business_type;
    public Long n_employee;
    public String district;
    public Long square_area;
    public Long square_buildings;
    public ArrayList<EquipmentDto> equipments;
    public String building_type;
    public Long accounting_papers;
    public String accounting_type;
    public String entity;
    public boolean isPatent;

}
