package com.cringeneers.LDThackathon.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "statistics")
public class Statistic {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String industry;
    private Double staff;
    private Double mean_salary_staff;
    private Double vat21;
    private Double vat22;
    private Double land_tax;
}
