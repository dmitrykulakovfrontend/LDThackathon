package com.cringeneers.LDThackathon.service;

import com.cringeneers.LDThackathon.dto.StatisticDto;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;

@Service
public class StatisticService {

    @PersistenceContext
    private EntityManager entityManager;

    public StatisticDto getStatistic(String industry) {
        StatisticDto statisticDto = new StatisticDto();
        statisticDto.setStaff_mean(BigDecimal.valueOf(calculateAverageStaffByIndustry(industry)));
        statisticDto.setMean_salary_staff_industry(BigDecimal.valueOf(calculateAverageMeanSalaryStaffByIndustry(industry)));
        statisticDto.setIncome22(BigDecimal.valueOf(calculateAverageVat22ByIndustry(industry) * 5));
        statisticDto.setAmountInSez(BigDecimal.valueOf(countForSEZ(industry)));
        statisticDto.setAmountInMsc(BigDecimal.valueOf(countForMSC(industry)));
        ArrayList<BigDecimal> incomes = new ArrayList<>();
        incomes.add(BigDecimal.valueOf(calculateAverageVat21ByIndustry(industry)));
        incomes.add(statisticDto.getIncome22());
        statisticDto.setIncomes(incomes);
        return statisticDto;
    }

    private long countForSEZ(String industry) {
        String query = "SELECT COUNT(s) FROM Statistic s WHERE s.industry = :industry AND s.land_tax = 0";
        return entityManager.createQuery(query, Long.class)
                    .setParameter("industry", industry)
                    .getSingleResult();
        }
    private long countForMSC(String industry) {
        String query = "SELECT COUNT(s) FROM Statistic s WHERE s.industry = :industry AND s.land_tax <> 0";
        return entityManager.createQuery(query, Long.class)
                    .setParameter("industry", industry)
                    .getSingleResult();
        }
    private Double calculateAverageStaffByIndustry(String industry) {
        String query = "SELECT AVG(s.staff) FROM Statistic s WHERE s.industry = :industry";
        TypedQuery<Double> typedQuery = entityManager.createQuery(query, Double.class);
        typedQuery.setParameter("industry", industry);
        return typedQuery.getSingleResult();
    }

    private Double calculateAverageMeanSalaryStaffByIndustry(String industry) {
        String query = "SELECT AVG(s.mean_salary_staff) FROM Statistic s WHERE s.industry = :industry";
        TypedQuery<Double> typedQuery = entityManager.createQuery(query, Double.class);
        typedQuery.setParameter("industry", industry);
        return typedQuery.getSingleResult();
    }
    private Double calculateAverageVat21ByIndustry(String industry) {
        String query = "SELECT AVG(s.vat21) FROM Statistic s WHERE s.industry = :industry";
        TypedQuery<Double> typedQuery = entityManager.createQuery(query, Double.class);
        typedQuery.setParameter("industry", industry);
        return typedQuery.getSingleResult();
    }
    private Double calculateAverageVat22ByIndustry(String industry) {
        String query = "SELECT AVG(s.vat22) FROM Statistic s WHERE s.industry = :industry";
        TypedQuery<Double> typedQuery = entityManager.createQuery(query, Double.class);
        typedQuery.setParameter("industry", industry);
        return typedQuery.getSingleResult();
    }

}
