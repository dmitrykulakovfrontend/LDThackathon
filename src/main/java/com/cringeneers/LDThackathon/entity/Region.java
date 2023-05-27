package com.cringeneers.LDThackathon.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "region_district")
public class Region {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name = "region")
    private String name;
    @Column(name = "district")
    private String district;
}
