package com.cringeneers.LDThackathon.controller;

import com.cringeneers.LDThackathon.dto.InvestRequestDto;
import com.cringeneers.LDThackathon.dto.InvestResponseDto;
import com.cringeneers.LDThackathon.repository.RoleRepository;
import com.cringeneers.LDThackathon.repository.UserRepository;
import com.cringeneers.LDThackathon.service.InvestService;
import com.cringeneers.LDThackathon.service.PdfService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;

@CrossOrigin(origins = { "*" }, methods = {RequestMethod.GET, RequestMethod.DELETE, RequestMethod.POST, RequestMethod.PUT, RequestMethod.OPTIONS}, allowCredentials = "false", allowedHeaders = { "*" }, exposedHeaders = { "*" })
@RestController
@RequestMapping("/api/invest")
public class InvestController {

    private InvestRequestDto investRequestDto;
    private InvestResponseDto investResponseDto;
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
        this.investRequestDto = investRequestDto;
        this.investResponseDto = investService.calculate(investRequestDto);
        return investService.calculate(investRequestDto);
    }

    @RequestMapping(path = "/download", method = RequestMethod.GET, produces = MediaType.APPLICATION_PDF_VALUE)
    public ResponseEntity<byte[]> download() throws IOException {
        ByteArrayOutputStream pdfData = pdfService.makePDF(investRequestDto, investResponseDto);


        if (pdfData != null) {
            try {
                // Устанавливаем заголовки ответа для скачивания файла
                HttpHeaders headers = new HttpHeaders();
                headers.setContentType(MediaType.APPLICATION_PDF);
                headers.setContentDisposition(ContentDisposition.builder("attachment").filename("review.pdf").build());

                // Возвращаем ResponseEntity с данными PDF и заголовками
                return new ResponseEntity<>(pdfData.toByteArray(), headers, HttpStatus.OK);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        // Если возникла ошибка, возвращаем ResponseEntity с ошибкой
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
}






