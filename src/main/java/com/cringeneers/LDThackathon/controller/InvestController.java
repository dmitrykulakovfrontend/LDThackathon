package com.cringeneers.LDThackathon.controller;

import com.cringeneers.LDThackathon.dto.InvestRequestDto;
import com.cringeneers.LDThackathon.dto.InvestResponseDto;
import com.cringeneers.LDThackathon.dto.StatisticDto;
import com.cringeneers.LDThackathon.repository.InvestResultRepository;
import com.cringeneers.LDThackathon.security.JwtUtilities;
import com.cringeneers.LDThackathon.service.InvestService;
import com.cringeneers.LDThackathon.service.PdfService;
import com.cringeneers.LDThackathon.service.StatisticService;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Map;

@CrossOrigin(origins = { "*" }, methods = {RequestMethod.GET, RequestMethod.DELETE, RequestMethod.POST, RequestMethod.PUT, RequestMethod.OPTIONS}, allowCredentials = "false", allowedHeaders = { "*" }, exposedHeaders = { "*" })
@RestController
@RequestMapping("/api/invest")
public class InvestController {

    private final InvestService investService;

    private final PdfService pdfService;
    final
    InvestResultRepository investResultRepository;
    private final JwtUtilities jwtUtilities;
    private final StatisticService statisticService;

    public InvestController(InvestService investService, PdfService pdfService, InvestResultRepository investResultRepository, JwtUtilities jwtUtilities, StatisticService statisticService) {
        this.investService = investService;
        this.pdfService = pdfService;
        this.investResultRepository = investResultRepository;
        this.jwtUtilities = jwtUtilities;
        this.statisticService = statisticService;
    }

    @PostMapping("/calculate")
    public InvestResponseDto calculateInvestigations(@RequestBody InvestRequestDto investRequestDto, @RequestHeader("Authorization") String authorizationHeader) throws IOException {
        String token = authorizationHeader.substring(7);
        String email = jwtUtilities.extractUsername(token);
        return investService.calculate(investRequestDto, email);
    }
    @PostMapping("/calculateAnonymous")
    public InvestResponseDto calculateAnonymousInvestigations(@RequestBody InvestRequestDto investRequestDto) throws IOException {
        return investService.calculate(investRequestDto, "anonymousUser");
    }

    @RequestMapping(path = "/download", method = RequestMethod.GET, produces = MediaType.APPLICATION_PDF_VALUE)
    public ResponseEntity<byte[]> download(@RequestHeader("Authorization") String authorizationHeader) throws IOException {
        String token = authorizationHeader.substring(7);
        String email = jwtUtilities.extractUsername(token);
        ByteArrayOutputStream pdfData = pdfService.makePDF(investResultRepository.findTopByEmailOrderByDateTimeDesc(email));
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
    @PostMapping({"/statistics"})
    public StatisticDto getEquipment(@RequestBody Map<String, Object> requestBody) {
        String industry = (String) requestBody.get("industry");
        return statisticService.getStatistic(industry);
    }
}






