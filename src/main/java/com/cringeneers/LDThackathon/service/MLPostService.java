package com.cringeneers.LDThackathon.service;

import com.cringeneers.LDThackathon.dto.MLPostDto;
import org.apache.http.client.fluent.Content;
import org.apache.http.client.fluent.Request;
import org.apache.http.entity.ContentType;
import org.apache.tomcat.util.json.JSONParser;
import org.json.JSONObject;
import org.springframework.boot.json.JsonParser;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class MLPostService {
    public double getSalary(MLPostDto mlPostDto) throws IOException {
        String industry = mlPostDto.getIndustry();
        Double staff = mlPostDto.getStaff();
        Double propertyTax = mlPostDto.getProperty_tax();
        Double landTax = mlPostDto.getLand_tax();
        int isOez = mlPostDto.getIs_oez();

        JSONObject jsonParams = new JSONObject();
        jsonParams.put("industry", industry);
        jsonParams.put("staff", staff);
        jsonParams.put("property_tax", propertyTax);
        jsonParams.put("land_tax", landTax);
        jsonParams.put("is_oez", isOez);

        final String response = Request.Post("http://80.249.147.60:5000/salary_service/")
                .bodyString(jsonParams.toString(), ContentType.APPLICATION_JSON)
                .execute()
                .returnContent()
                .asString();

        JSONObject jsonResponse = new JSONObject(response);
        Double salary = jsonResponse.getDouble("salary");
        System.out.println(jsonResponse);
        return salary;
    }
}
