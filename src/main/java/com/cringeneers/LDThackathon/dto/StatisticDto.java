package com.cringeneers.LDThackathon.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.ArrayList;

@Data
public class StatisticDto {

    public BigDecimal staff_mean;
    public BigDecimal mean_salary_staff_industry;
    public BigDecimal income22;
    public BigDecimal amountInMsc;
    public BigDecimal amountInSez;
    public ArrayList<BigDecimal> incomes;


}
