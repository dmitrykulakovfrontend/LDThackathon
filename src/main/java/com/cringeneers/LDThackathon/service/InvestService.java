package com.cringeneers.LDThackathon.service;

import com.cringeneers.LDThackathon.dto.InvestRequestDto;
import com.cringeneers.LDThackathon.dto.InvestResponseDto;
import org.springframework.stereotype.Service;

@Service
public class InvestService {
    public InvestResponseDto calculate(InvestRequestDto investRequestDto) {
        InvestResponseDto investResponseDto = new InvestResponseDto();
        return investResponseDto;
    }

}
