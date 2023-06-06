package com.cringeneers.LDThackathon.repository;

import com.cringeneers.LDThackathon.entity.InvestResult;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InvestResultRepository extends JpaRepository<InvestResult, Long> {
    InvestResult findInvestResultByEmail(String email);
   InvestResult findTopByEmailOrderByDateTimeDesc(String email);
}
