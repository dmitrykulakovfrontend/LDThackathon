package com.cringeneers.LDThackathon;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.PropertySource;

@SpringBootApplication
public class LdThackathonApplication extends SpringBootServletInitializer {

	public static void main(String[] args) {
		SpringApplication.run(LdThackathonApplication.class, args);
	}

}
