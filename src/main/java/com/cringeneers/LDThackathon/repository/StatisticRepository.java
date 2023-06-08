package com.cringeneers.LDThackathon.repository;

import com.cringeneers.LDThackathon.entity.Statistic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StatisticRepository extends JpaRepository <Statistic, Long> {

}
