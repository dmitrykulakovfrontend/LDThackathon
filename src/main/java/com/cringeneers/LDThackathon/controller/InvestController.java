package com.cringeneers.LDThackathon.controller;

import com.cringeneers.LDThackathon.dto.InvestRequestDto;
import com.cringeneers.LDThackathon.dto.InvestResponseDto;
import com.cringeneers.LDThackathon.repository.RoleRepository;
import com.cringeneers.LDThackathon.repository.UserRepository;
import com.cringeneers.LDThackathon.service.InvestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;

@CrossOrigin(origins = { "*" }, methods = {RequestMethod.GET, RequestMethod.DELETE, RequestMethod.POST, RequestMethod.PUT, RequestMethod.OPTIONS}, allowCredentials = "false", allowedHeaders = { "*" }, exposedHeaders = { "*" })
@RestController
@RequestMapping("/api/invest")
public class InvestController {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private InvestService investService;
    @PostMapping("/calculate")
    public InvestResponseDto calculateInvestigations(@RequestBody InvestRequestDto investRequestDto){
        return investService.calculate(investRequestDto);
    }
    @RequestMapping(path = "/download", method = RequestMethod.GET)
    public ResponseEntity<InputStreamResource> download() throws IOException {
        File file = new File("templateNew.pdf");
        InputStreamResource resource = new InputStreamResource(new FileInputStream(file));

        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=img.jpg");
        headers.add("Cache-Control", "no-cache, no-store, must-revalidate");
        headers.add("Pragma", "no-cache");
        headers.add("Expires", "0");

        return ResponseEntity.ok()
                .headers(headers)
                .contentLength(file.length())
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(resource);
    }
}
