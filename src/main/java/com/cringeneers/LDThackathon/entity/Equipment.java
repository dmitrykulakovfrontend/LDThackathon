package com.cringeneers.LDThackathon.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Equipment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name = "equipment_type")
    private String type;
    @Column(name = "cost_r")
    private Double price;
    private Long time;
}
