package com.cringeneers.LDThackathon.controller;

import com.cringeneers.LDThackathon.dto.InvestRequestDto;
import com.cringeneers.LDThackathon.dto.InvestResponseDto;
import com.cringeneers.LDThackathon.repository.InvestResultRepository;
import com.cringeneers.LDThackathon.service.InvestService;
import com.cringeneers.LDThackathon.service.PdfService;
import org.springframework.http.*;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayOutputStream;
import java.io.IOException;

@CrossOrigin(origins = { "*" }, methods = {RequestMethod.GET, RequestMethod.DELETE, RequestMethod.POST, RequestMethod.PUT, RequestMethod.OPTIONS}, allowCredentials = "false", allowedHeaders = { "*" }, exposedHeaders = { "*" })
@RestController
@RequestMapping("/api/invest")
public class InvestController {

    private final InvestService investService;

    private final PdfService pdfService;
    final
    InvestResultRepository investResultRepository;

    public InvestController(InvestService investService, PdfService pdfService, InvestResultRepository investResultRepository) {
        this.investService = investService;
        this.pdfService = pdfService;
        this.investResultRepository = investResultRepository;
    }

    @PostMapping("/calculate")
    public InvestResponseDto calculateInvestigations(@RequestBody InvestRequestDto investRequestDto) {
        return investService.calculate(investRequestDto);
    }

    @RequestMapping(path = "/download", method = RequestMethod.GET, produces = MediaType.APPLICATION_PDF_VALUE)
    public ResponseEntity<byte[]> download() throws IOException {
        ByteArrayOutputStream pdfData = pdfService.makePDF(investResultRepository.findInvestResultByEmail(SecurityContextHolder.getContext().getAuthentication().getName()));
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






