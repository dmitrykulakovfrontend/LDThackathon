package com.cringeneers.LDThackathon.service;

import com.cringeneers.LDThackathon.dto.EquipmentDto;
import com.cringeneers.LDThackathon.dto.InvestRequestDto;
import com.cringeneers.LDThackathon.dto.InvestResponseDto;
import com.cringeneers.LDThackathon.dto.MLPostDto;
import com.cringeneers.LDThackathon.entity.InvestResult;
import com.cringeneers.LDThackathon.repository.DistrictRepository;
import com.cringeneers.LDThackathon.repository.InvestResultRepository;
import com.cringeneers.LDThackathon.repository.RatesRepository;
import com.cringeneers.LDThackathon.repository.RegionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class InvestService {
    private final static double NDFL = 0.13;
    private final static double RETIRE = 0.22;
    private final static double MEDIC = 0.05;
    private final static double SALARY_TAX = NDFL + RETIRE + MEDIC;
    private final static double IP = 800;
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
    private final RatesRepository ratesRepository;
    private final RegionRepository regionRepository;
    private final BusinessService businessService;
    private final EquipmentService equipmentService;
    private final MLPostService mlPostService;
    private final InvestResultRepository investResultRepository;
    private final AuthenticationManager authenticationManager;


    public InvestResponseDto calculate(InvestRequestDto investRequestDto, String email) throws IOException {
        double account_base = 0;
        InvestResponseDto investResponseDto = new InvestResponseDto();
        investResponseDto.setLand(BigDecimal.valueOf(investRequestDto.getSquare_area() * districtRepository.findByName(regionRepository.findByName(investRequestDto.district).getDistrict()).getCost()));
        if (investRequestDto.district.equals("район Текстильщики") || districtRepository.findByName(regionRepository.findByName(investRequestDto.district).getDistrict()).getName().equals("ЗелАО")) {
            investResponseDto.setLandTax(BigDecimal.valueOf(0));
            investResponseDto.setPropertyTax(BigDecimal.valueOf(0));
        } else {
            investResponseDto.setLandTax(BigDecimal.valueOf(investResponseDto.getLand().doubleValue() * 0.015));
            investResponseDto.setPropertyTax((BigDecimal.valueOf(investResponseDto.getLand().doubleValue() * 0.022)));
        }
        BigDecimal salaries;
        MLPostDto mlPostDto = new MLPostDto();
        mlPostDto.setIndustry(investRequestDto.getBusiness_type());
        mlPostDto.setStaff(Double.valueOf(investRequestDto.n_employee));
        mlPostDto.setProperty_tax(investResponseDto.getPropertyTax().doubleValue());
        mlPostDto.setLand_tax(investResponseDto.getLandTax().doubleValue());
        mlPostDto.setIs_oez(investResponseDto.getLandTax().doubleValue() == 0 ? 1 : 0);
        try {
            salaries = (BigDecimal.valueOf(1000 *mlPostService.getSalary(mlPostDto) * investRequestDto.getN_employee()));
        } catch (Exception e) {
            e.printStackTrace();
            salaries = (BigDecimal.valueOf(1000 * investRequestDto.getN_employee() * businessService.getBusinessByType(investRequestDto.getBusiness_type()).getMinimalSalary()));
        }
        investResponseDto.setSalaries(salaries);
        investResponseDto.setBuilding(new BigDecimal(investRequestDto.getSquare_buildings() * SQUARE_PRICE));
        investResponseDto.setEntityRegistration(investRequestDto.getEntity().equalsIgnoreCase("ip") ? ratesRepository.findByRate("UL").getValue() : IP  );
        investResponseDto.setNdfl(BigDecimal.valueOf((investResponseDto.getSalaries().doubleValue() / SALARY_TAX * NDFL)));
        investResponseDto.setMedic(BigDecimal.valueOf((investResponseDto.getSalaries().doubleValue() / SALARY_TAX * MEDIC)));
        investResponseDto.setRetire(BigDecimal.valueOf((investResponseDto.getSalaries().doubleValue() / SALARY_TAX * RETIRE)));
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

        InvestResult investResult = getInvestResult(investRequestDto, investResponseDto);
            try {
            investResult.setEmail(email);
            investResult.setDateTime(ZonedDateTime.now(ZoneId.of("Europe/Moscow")).toLocalDateTime());
            investResultRepository.save(investResult);
        } catch (Exception e) {
            e.printStackTrace();
        }
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
    private InvestResult getInvestResult(InvestRequestDto investRequestDto, InvestResponseDto investResponseDto) {
        InvestResult investResult = new InvestResult();
        investResult.setMedic(investResponseDto.getMedic().toBigInteger());
        investResult.setRetire(investResponseDto.getRetire().toBigInteger());
        investResult.setTotal(investResponseDto.getTotal().toBigInteger());
        investResult.setPersonal(investResponseDto.getSalaries().toBigInteger());
        investResult.setLandTaxes(BigInteger.valueOf(investResponseDto.getLandTax().intValue()));
        investResult.setPropertyTaxes(BigInteger.valueOf(investResponseDto.getPropertyTax().intValue()));
        investResult.setBuilding_rent(investResponseDto.getBuilding().toBigInteger());
        investResult.setLand(investResponseDto.getLand().toBigInteger());
        investResult.setEngineerOnce(investResponseDto.getEngineerOnce().toBigInteger());
        investResult.setEngineerYear(investResponseDto.getEngineerYear().toBigInteger());
        investResult.setNdfl(investResponseDto.getNdfl().toBigInteger());
        investResult.setBusiness_type(investRequestDto.getBusiness_type());
        investResult.setDistrict_price(BigInteger.valueOf(investResponseDto.getLand().intValue() / investRequestDto.getSquare_area().intValue()));
        investResult.setTotalOnce(BigInteger.valueOf((investResult.getBuilding_rent().intValue() + investResponseDto.getLand().intValue() + investResponseDto.getPatentRegistration().intValue() + investResult.getEngineerOnce().intValue() + investResponseDto.getEntityRegistration().intValue() + investResponseDto.getEquipment().intValue())));
        investResult.setTotalYear(BigInteger.valueOf (investResult.getTotal().intValue() - investResult.getTotalOnce().intValue()));
        investResult.setSquare_area(investRequestDto.getSquare_area());
        investResult.setSquare_buildings(investRequestDto.getSquare_buildings());
        investResult.setAccountingPapers(investRequestDto.getAccounting_papers());
        investResult.setPatentRegistration(investResponseDto.getPatentRegistration().longValue());
        investResult.setEntityRegistration(investResponseDto.getEntityRegistration().longValue());
        investResult.setAccounting(investResponseDto.getAccounting().toBigInteger());
        investResult.setEquipment(investResponseDto.getEquipment().toBigInteger());
        investResult.setAmmortisation(investResponseDto.getAmortisation().toBigInteger());

        if (investRequestDto.getEntity().equalsIgnoreCase("ooo")) {
            investResult.setOrganisationType("OOO");
        } else if (investRequestDto.getEntity().equalsIgnoreCase("zao")) {
            investResult.setOrganisationType("ЗАО");
        } else if (investRequestDto.getEntity().equalsIgnoreCase("oao")) {
            investResult.setOrganisationType("ОАО");
        } else if (investRequestDto.getEntity().equalsIgnoreCase("pao")) {
            investResult.setOrganisationType("ПАО");
        } else if (investRequestDto.getEntity().equalsIgnoreCase("ip")) {
            investResult.setOrganisationType("ИП");
        }
        investResult.setEmployees_number(investRequestDto.getN_employee());
        investResult.setDistrict(investRequestDto.getDistrict());
        if (investRequestDto.getAccounting_type().equalsIgnoreCase("6%")) {
            investResult.setAccountingType("УСН 6%");
        } else if (investRequestDto.getAccounting_type().equalsIgnoreCase("15%")) {
            investResult.setAccountingType("УСН 15%");
        } else {
            investResult.setAccountingType("ОСН");
        }
        return investResult;
    }

}
