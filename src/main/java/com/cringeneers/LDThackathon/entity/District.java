package com.cringeneers.LDThackathon.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "districts")
public class District {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name = "district")
    private String name;
    @Column(name = "aver_cost")
    private Double cost;
}
