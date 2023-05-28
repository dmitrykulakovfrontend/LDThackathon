package com.cringeneers.LDThackathon.service;

import com.cringeneers.LDThackathon.entity.Business;

import java.util.List;

public interface BusinessService {
    Business createBusiness(Business business);
    Business getBusinessByType(String type);
    List<Business> getAllBusinesess();
    void update(String type, Business business);

    void delete(String type);
}
