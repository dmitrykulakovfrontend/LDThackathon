package com.cringeneers.LDThackathon.repository;

import com.cringeneers.LDThackathon.entity.Rate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RatesRepository extends JpaRepository<Rate, Long> {
    Rate findByRate(String rate);

}
