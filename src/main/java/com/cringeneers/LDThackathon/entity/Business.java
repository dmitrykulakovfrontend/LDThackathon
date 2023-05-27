package com.cringeneers.LDThackathon.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "patent")
public class Business {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name = "industry")
    private String type;
    @Column(name = "mean_salary_staff")
    private Double minimalSalary;
    @Column(name = "cost")
    private Double cost;

}
