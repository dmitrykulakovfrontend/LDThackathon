package com.cringeneers.LDThackathon.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;

@Data
public class StatisticDto {

    public BigDecimal staff_mean;
    public BigDecimal mean_salary_staff_industry;
    public BigDecimal income22;
    public BigDecimal amountInMsc;
    public BigDecimal amountInSez;
    public ArrayList<IncomesDto> incomes;


}
