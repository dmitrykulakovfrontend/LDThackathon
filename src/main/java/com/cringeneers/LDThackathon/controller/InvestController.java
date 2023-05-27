package com.cringeneers.LDThackathon.controller;

import com.cringeneers.LDThackathon.dto.InvestRequestDto;
import com.cringeneers.LDThackathon.dto.InvestResponseDto;
import com.cringeneers.LDThackathon.repository.RoleRepository;
import com.cringeneers.LDThackathon.repository.UserRepository;
import com.cringeneers.LDThackathon.service.InvestService;
import com.cringeneers.LDThackathon.service.PdfService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.io.InputStream;

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

    @Autowired
    private PdfService pdfService;

    @PostMapping("/calculate")
    public InvestResponseDto calculateInvestigations(@RequestBody InvestRequestDto investRequestDto) {
        return investService.calculate(investRequestDto);
    }

    @RequestMapping(path = "/download", method = RequestMethod.GET, produces = MediaType.APPLICATION_PDF_VALUE)
    public ResponseEntity<InputStreamResource> download() throws IOException {
        InputStream inputNewStream = PdfService.class.getClassLoader().getResourceAsStream("static/templateNew.pdf");
        assert inputNewStream != null;
        InputStreamResource resource = new InputStreamResource(inputNewStream);

        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=templateNew.pdf");
        headers.add("Cache-Control", "no-cache, no-store, must-revalidate");
        headers.add("Pragma", "no-cache");
        headers.add("Expires", "0");

        return ResponseEntity.ok()
                .headers(headers)
                .contentLength(inputNewStream.available())
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(resource);
    }
}
