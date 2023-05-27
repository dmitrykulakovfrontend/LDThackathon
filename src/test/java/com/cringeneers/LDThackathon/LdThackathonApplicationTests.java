package com.cringeneers.LDThackathon;

import com.cringeneers.LDThackathon.repository.DistrictRepository;
import com.cringeneers.LDThackathon.repository.RegionRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class LdThackathonApplicationTests {
	@Autowired
	DistrictRepository districtRepository;
	@Autowired
	RegionRepository regionRepository;

	@Test
	void contextLoads() {
		System.out.println(regionRepository.findByName("район Богородское"));
	}

}
