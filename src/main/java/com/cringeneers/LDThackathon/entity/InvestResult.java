package com.cringeneers.LDThackathon.entity;

import com.cringeneers.LDThackathon.dto.InvestRequestDto;
import com.cringeneers.LDThackathon.dto.InvestResponseDto;
import jakarta.persistence.*;
import lombok.Data;

import java.math.BigInteger;
import java.sql.Timestamp;
import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "invest_result")
public class InvestResult {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    String email;
    BigInteger medic;
    BigInteger retire;
    BigInteger total;
    BigInteger personal;
    BigInteger landTaxes;
    BigInteger propertyTaxes;
    BigInteger building_rent;
    BigInteger land;
    BigInteger engineerOnce;
    BigInteger engineerYear;
    BigInteger ndfl;
    String business_type;
    BigInteger district_price;
    BigInteger totalOnce;
    BigInteger totalYear;
    Long square_area;
    Long square_buildings;
    Long accountingPapers;
    Long patentRegistration;
    Long entityRegistration;
    BigInteger accounting;
    BigInteger equipment;
    BigInteger ammortisation;
    String organisationType;
    Long employees_number;
    String district;
    String accountingType;
    @Column(name = "dateTime")
    LocalDateTime dateTime;
}
