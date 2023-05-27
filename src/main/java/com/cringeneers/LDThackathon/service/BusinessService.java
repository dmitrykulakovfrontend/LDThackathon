package com.cringeneers.LDThackathon.service;

import com.cringeneers.LDThackathon.entity.Business;

public interface BusinessService {
    Business createBusiness(Business business);
    Business getBusinessByType(String type);
}
