package com.cringeneers.LDThackathon.entity;


import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "actual_rates")
public class Rate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name = "rate")
    private String rate;
    @Column(name = "value")
    private Double value;
}
