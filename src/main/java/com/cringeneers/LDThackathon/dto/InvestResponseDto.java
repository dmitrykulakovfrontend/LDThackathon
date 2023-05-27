package com.cringeneers.LDThackathon.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class InvestResponseDto {
    public BigDecimal total;
    public BigDecimal building;
    public BigDecimal land;
    public Double entityRegistration;
    public BigDecimal equipment;
    public BigDecimal salaries;
    public BigDecimal ndfl;
    public BigDecimal retire;
    public BigDecimal medic;
    public BigDecimal landTax;
    public BigDecimal propertyTax;
    public BigDecimal amortisation;
    public BigDecimal patentRegistration;
    public BigDecimal accounting;


}
