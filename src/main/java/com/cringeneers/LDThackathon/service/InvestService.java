package com.cringeneers.LDThackathon.service;

import com.cringeneers.LDThackathon.dto.EquipmentDto;
import com.cringeneers.LDThackathon.dto.InvestRequestDto;
import com.cringeneers.LDThackathon.dto.InvestResponseDto;
import com.cringeneers.LDThackathon.repository.DistrictRepository;
import com.cringeneers.LDThackathon.repository.RegionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class InvestService {
    private final static double NDFL = 0.13;
    private final static double RETIRE = 0.22;
    private final static double MEDIC = 0.05;
    private final static double SALARY_TAX = NDFL + RETIRE + MEDIC;
    private final static double IP = 4000;
    private final static double UL = 800;
    private final static double ACCOUNT_BASE_PERSON = 500;
    private final static double SQUARE_PRICE = 100000;
    private final static double M1 = 0.025;
    private final static double M2 = 0.5;
    private final static double ELECTRICITY_CONST1 = 3000;
    private final static double ELECTRICITY_CONST2 = 5.92;
    private final static double HEIGHT = 5;
    private final static double MEAN_TEMPERATURE = 5.8;
    private final static double PRICE_WATER = 44;
    private final static double WATER_CONNECTION = 500000;
    private final static double TERMO_CONNECTION = 500000;

    private final DistrictRepository districtRepository;
    private final RegionRepository regionRepository;
    private final BusinessService businessService;
    private final EquipmentService equipmentService;
    private final PdfService pdfService;


    public InvestResponseDto calculate(InvestRequestDto investRequestDto) {
        double account_base = 0;
        InvestResponseDto investResponseDto = new InvestResponseDto();
        investResponseDto.setBuilding(new BigDecimal(investRequestDto.getSquare_buildings() * SQUARE_PRICE));
        investResponseDto.setLand(BigDecimal.valueOf(investRequestDto.getSquare_area() * districtRepository.findByName(regionRepository.findByName(investRequestDto.district).getDistrict()).getCost()));
        investResponseDto.setEntityRegistration(investRequestDto.getEntity().equalsIgnoreCase("ip") ? 4000.0 : 800.0  );
        investResponseDto.setSalaries(BigDecimal.valueOf(1000 * investRequestDto.getN_employee() * businessService.getBusinessByType(investRequestDto.getBusiness_type()).getMinimalSalary()));
        investResponseDto.setNdfl(BigDecimal.valueOf((investResponseDto.getSalaries().doubleValue() / SALARY_TAX * NDFL)));
        investResponseDto.setMedic(BigDecimal.valueOf((investResponseDto.getSalaries().doubleValue() / SALARY_TAX * MEDIC)));
        investResponseDto.setRetire(BigDecimal.valueOf((investResponseDto.getSalaries().doubleValue() / SALARY_TAX * RETIRE)));

        if (investRequestDto.district.equals("район Текстильщики") || districtRepository.findByName(regionRepository.findByName(investRequestDto.district).getDistrict()).getName().equals("ЗелАО")) {
            investResponseDto.setLandTax(BigDecimal.valueOf(0));
            investResponseDto.setPropertyTax(BigDecimal.valueOf(0));
        } else {
            investResponseDto.setLandTax(BigDecimal.valueOf(investResponseDto.getLand().doubleValue() * 0.015));
            investResponseDto.setPropertyTax((BigDecimal.valueOf(investResponseDto.getLand().doubleValue() * 0.022)));
        }
        investResponseDto.setEquipment(BigDecimal.valueOf(calculateEquipment(investRequestDto.getEquipments())));
        investResponseDto.setAmortisation(BigDecimal.valueOf(calculateAmortisation(investRequestDto.getEquipments())));
        investResponseDto.setPatentRegistration(BigDecimal.valueOf(investRequestDto.isPatent ? 1000 * businessService.getBusinessByType(investRequestDto.getBusiness_type()).getCost() : 0));
        if (investRequestDto.getAccounting_type().equalsIgnoreCase("6%")) {
            account_base = 3000;
        } else if (investRequestDto.getAccounting_type().equalsIgnoreCase("15%")) {
            account_base = 6000;
        } else {
            account_base = 7000;
        }
        investResponseDto.setAccounting(BigDecimal.valueOf(BigDecimal.valueOf(account_base * (investRequestDto.getAccounting_papers().doubleValue() / 20)).doubleValue() + (investRequestDto.getN_employee() * ACCOUNT_BASE_PERSON)));
        investResponseDto.setEngineerOnce(BigDecimal.valueOf(WATER_CONNECTION + TERMO_CONNECTION + calculateElectricityOnce(investRequestDto.getEquipments())));
        investResponseDto.setEngineerYear(BigDecimal.valueOf(50000 + ((M1 + M2) * 365 * investRequestDto.getN_employee()) + calculateElectricityYear(investRequestDto.getEquipments()) + ((investRequestDto.getSquare_buildings() * HEIGHT * (18 - MEAN_TEMPERATURE) * 220 * 24 / 1000000))));
        investResponseDto.setTotal(BigDecimal.valueOf(investResponseDto.getEngineerYear().doubleValue() + investResponseDto.getEngineerOnce().doubleValue() + investResponseDto.getBuilding().doubleValue() + investResponseDto.getLand().doubleValue() + investResponseDto.getEntityRegistration() + investResponseDto.getSalaries().doubleValue() + investResponseDto.getNdfl().doubleValue() + investResponseDto.getMedic().doubleValue() + investResponseDto.getRetire().doubleValue() + investResponseDto.getLandTax().doubleValue() + investResponseDto.getPropertyTax().doubleValue() + investResponseDto.getEquipment().doubleValue() + investResponseDto.getAmortisation().doubleValue() + investResponseDto.getPatentRegistration().doubleValue() + investResponseDto.getAccounting().doubleValue()));


        pdfService.makePDF(investRequestDto, investResponseDto);
        return investResponseDto;
    }
    private Double calculateEquipment(ArrayList<EquipmentDto> equipments) {
        double cost = 0;
        for (EquipmentDto equipment : equipments) {
            cost += equipment.getAmount() * equipmentService.getEquipmentByType(equipment.getType()).getCost();
        }
        return cost;
    }
    private Double calculateAmortisation(ArrayList<EquipmentDto> equipments) {
        double cost = 0;
        for (EquipmentDto equipment : equipments) {
            cost += equipment.getAmount() * equipmentService.getEquipmentByType(equipment.getType()).getCost();
            cost *= (1.0 / (equipment.getTime() * 12));
        }
        return cost;
    }
    private Double calculateElectricityOnce(ArrayList<EquipmentDto> equipments) {
        double cost = 0;
        for (EquipmentDto equipment : equipments) {
            cost += equipment.getAmount() * ELECTRICITY_CONST1;
        }
        return cost;
    }
    private Double calculateElectricityYear(ArrayList<EquipmentDto> equipments) {
        double cost = 0;
        for (EquipmentDto equipment : equipments) {
            cost += equipment.getAmount() * ELECTRICITY_CONST2 * 24 * 365;
        }
        return cost;
    }

}
