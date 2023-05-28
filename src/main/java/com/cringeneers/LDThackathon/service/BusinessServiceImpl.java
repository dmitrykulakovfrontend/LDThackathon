package com.cringeneers.LDThackathon.service;

import com.cringeneers.LDThackathon.entity.Business;
import com.cringeneers.LDThackathon.repository.BusinessRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class BusinessServiceImpl implements BusinessService{

    private BusinessRepository businessRepository;
    @Override
    public Business createBusiness(Business business) {
        return businessRepository.save(business);
    }

    @Override
    public Business getBusinessByType(String type) {
        return businessRepository.findByType(type);
    }

    @Override
    public List<Business> getAllBusinesess() {
        return businessRepository.findAll();
    }

    @Override
    public void update(String type, Business business) {
        Business businessFromDb = businessRepository.findByType(type);
        businessFromDb.setMinimalSalary(business.getMinimalSalary());
        businessFromDb.setCost(business.getCost());
        businessFromDb.setType(business.getType());
        businessRepository.save(businessFromDb);
    }

    @Override
    public void delete(String type) {
        businessRepository.delete(businessRepository.findByType(type));
    }

}
