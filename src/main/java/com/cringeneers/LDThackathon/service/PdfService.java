package com.cringeneers.LDThackathon.service;

import com.cringeneers.LDThackathon.entity.InvestResult;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.font.PDFont;
import org.apache.pdfbox.pdmodel.font.PDType0Font;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.math.BigInteger;

@Service
public class PdfService {

    public PdfService() {
    }

    public ByteArrayOutputStream makePDF(InvestResult investResult) {
        BigInteger medic = investResult.getMedic();
        BigInteger retire = investResult.getRetire();
        BigInteger total = investResult.getTotal();
        BigInteger personal = investResult.getPersonal();
        BigInteger landTaxes = investResult.getLandTaxes();
        BigInteger propertyTaxes = investResult.getPropertyTaxes();
        BigInteger building_rent = investResult.getBuilding_rent();
        BigInteger land = investResult.getLand();
        BigInteger engineerOnce = investResult.getEngineerOnce();
        BigInteger engineerYear = investResult.getEngineerYear();
        BigInteger ndfl = investResult.getNdfl();
        String business_type = investResult.getBusiness_type();
        BigInteger district_price = investResult.getDistrict_price();
        BigInteger totalOnce = investResult.getTotalOnce();
        BigInteger totalYear = investResult.getTotalYear();
        Long square_area = investResult.getSquare_area();
        Long square_buildings = investResult.getSquare_buildings();
        Long accountingPapers = investResult.getAccountingPapers();
        Long patentRegistration = investResult.getPatentRegistration();
        Long entityRegistration = investResult.getEntityRegistration();
        BigInteger accounting = investResult.getAccounting();
        BigInteger equipment = investResult.getEquipment();
        BigInteger ammortisation = investResult.getAmmortisation();

        String organisation_type = investResult.getOrganisationType();
        Long employees_number = investResult.getEmployees_number();
        String district = investResult.getDistrict();
        String accountingType = investResult.getAccountingType();
        return insertNumbersInTemplate(equipment, ammortisation, engineerYear, engineerOnce, patentRegistration, entityRegistration, accounting, accountingPapers, land, square_area, square_buildings, district_price ,ndfl, medic, retire, String.valueOf(accountingType), totalOnce, totalYear, total, personal, landTaxes, propertyTaxes, building_rent, business_type, String.valueOf(organisation_type), employees_number, district);
    }
    public ByteArrayOutputStream insertNumbersInTemplate(BigInteger equipment, BigInteger ammortisation, BigInteger engineerYear, BigInteger engineerOnce, Long patentRegistration , Long entityRegistration, BigInteger accounting, Long accountingPapers,BigInteger land, Long square_area, Long square_buildings, BigInteger district_price ,BigInteger ndfl, BigInteger medic, BigInteger retire, String accountingType, BigInteger totalOnce, BigInteger totalYear, BigInteger total, BigInteger personal, BigInteger landTax, BigInteger propertyTax, BigInteger building_rent, String business_type, String organisation_type, long employeesNumber, String district) {
        InputStream inputStream = PdfService.class.getClassLoader().getResourceAsStream("static/template.pdf");
        InputStream fontStream = PdfService.class.getClassLoader().getResourceAsStream("static/Manrope.TTF");
        try (PDDocument document = PDDocument.load(inputStream)) {
            PDPage page = document.getPage(2);
            PDPage page2 = document.getPage(3);
            PDPage page3 = document.getPage(4);
            PDPage page4 = document.getPage(5);
            PDPage page5 = document.getPage(6);
            PDFont font = PDType0Font.load(document, fontStream);

            int maxWidth = 0;
            int currentFontSize = 0;
            int currentYOffset = 0;
            int currentXOffset = 0;
            int maxWidth1 = 0;
            int currentFontSize1 = 0;
            int currentYOffset1 = 0;
            int currentXOffset1 = 0;


            PDPageContentStream contentStream = new PDPageContentStream(document, page, PDPageContentStream.AppendMode.APPEND, true, true);
            PDPageContentStream contentStream2 = new PDPageContentStream(document, page2, PDPageContentStream.AppendMode.APPEND, true, true);
            PDPageContentStream contentStream3 = new PDPageContentStream(document, page3, PDPageContentStream.AppendMode.APPEND, true, true);
            PDPageContentStream contentStream4 = new PDPageContentStream(document, page4, PDPageContentStream.AppendMode.APPEND, true, true);
            PDPageContentStream contentStream5 = new PDPageContentStream(document, page5, PDPageContentStream.AppendMode.APPEND, true, true);

            contentStream.beginText();
            contentStream.setFont(font, 25);
            contentStream.newLineAtOffset(230, 173);
            contentStream.showText(total + " рублей");
            contentStream.endText();

            contentStream.beginText();
            contentStream.setFont(font, 15);
            contentStream.newLineAtOffset(300, 452);
            contentStream.showText(String.valueOf(accountingType));
            contentStream.endText();

            contentStream.beginText();
            contentStream.setFont(font, 15);
            contentStream.newLineAtOffset(80, 248);
            contentStream.showText(totalOnce + " рублей");
            contentStream.endText();

            contentStream.beginText();
            contentStream.setFont(font, 15);
            contentStream.newLineAtOffset(330, 245);
            contentStream.showText(totalYear + " рублей");
            contentStream.endText();

            contentStream.beginText();
            contentStream.setFont(font, 15);
            contentStream.newLineAtOffset(300, 508);
            contentStream.showText(String.valueOf(district));
            contentStream.endText();

            contentStream.beginText();
            contentStream.setFont(font, 15);
            contentStream.newLineAtOffset(300, 557);
            contentStream.showText(employeesNumber + " человек(а)");
            contentStream.endText();

            contentStream.beginText();
            contentStream.setFont(font, 15);
            contentStream.newLineAtOffset(300, 607);
            contentStream.showText(String.valueOf(organisation_type));
            contentStream.endText();


            if(business_type.length() > 40) {
                String shortBusinessType = (business_type.substring(0, 40));
                contentStream.beginText();
                contentStream.setFont(font, 15);
                contentStream.newLineAtOffset(200, 659);
                contentStream.showText(shortBusinessType + "...");
                contentStream.endText();
            } else {
                contentStream.beginText();
                contentStream.setFont(font, 15);
                contentStream.newLineAtOffset(200, 659);
                contentStream.showText(business_type);
                contentStream.endText();
            }

            contentStream2.beginText();
            contentStream2.setFont(font, 15);
            contentStream2.newLineAtOffset(300, 145);
            contentStream2.showText(medic + " рублей");
            contentStream2.endText();

            contentStream2.beginText();
            contentStream2.setFont(font, 15);
            contentStream2.newLineAtOffset(300, 250);
            contentStream2.showText(ndfl + " рублей");
            contentStream2.endText();

            contentStream2.beginText();
            contentStream2.setFont(font, 15);
            contentStream2.newLineAtOffset(300, 195);
            contentStream2.showText(retire + " рублей");
            contentStream2.endText();

            contentStream2.beginText();
            contentStream2.setFont(font, 15);
            contentStream2.newLineAtOffset(300, 400);
            contentStream2.showText(employeesNumber + " человек(а)");
            contentStream2.endText();

            contentStream2.beginText();
            contentStream2.setFont(font, 15);
            contentStream2.newLineAtOffset(300, 300);
            contentStream2.showText(personal + " рублей");
            contentStream2.endText();

            contentStream3.beginText();
            contentStream3.setFont(font, 15);
            contentStream3.newLineAtOffset(300, 674);
            contentStream3.showText(String.valueOf(district));
            contentStream3.endText();

            contentStream3.beginText();
            contentStream3.setFont(font, 15);
            contentStream3.newLineAtOffset(300, 623);
            contentStream3.showText(district_price + " рублей");
            contentStream3.endText();

            contentStream3.beginText();
            contentStream3.setFont(font, 15);
            contentStream3.newLineAtOffset(300, 573);
            contentStream3.showText(square_area + " кв.м");
            contentStream3.endText();

            contentStream3.beginText();
            contentStream3.setFont(font, 15);
            contentStream3.newLineAtOffset(300, 522);
            contentStream3.showText(square_buildings + " кв.м");
            contentStream3.endText();

            contentStream3.beginText();
            contentStream3.setFont(font, 15);
            contentStream3.newLineAtOffset(300, 340);
            contentStream3.showText(land + " рублей");
            contentStream3.endText();

            contentStream3.beginText();
            contentStream3.setFont(font, 15);
            contentStream3.newLineAtOffset(300, 290);
            contentStream3.showText(building_rent + " рублей");
            contentStream3.endText();

            contentStream3.beginText();
            contentStream3.setFont(font, 15);
            contentStream3.newLineAtOffset(300, 195);
            contentStream3.showText(landTax + " рублей");
            contentStream3.endText();

            contentStream3.beginText();
            contentStream3.setFont(font, 15);
            contentStream3.newLineAtOffset(300, 145);
            contentStream3.showText(propertyTax + " рублей");
            contentStream3.endText();

            contentStream4.beginText();
            contentStream4.setFont(font, 15);
            contentStream4.newLineAtOffset(300, 668);
            contentStream4.showText(organisation_type);
            contentStream4.endText();


            if(business_type.length() > 25) {
                String shortBusinessType = (business_type.substring(0, 25));
                contentStream4.beginText();
                contentStream4.setFont(font, 15);
                contentStream4.newLineAtOffset(300, 620);
                contentStream4.showText(shortBusinessType + "...");
                contentStream4.endText();
            } else {
                contentStream4.beginText();
                contentStream4.setFont(font, 15);
                contentStream4.newLineAtOffset(300, 620);
                contentStream4.showText(business_type);
                contentStream4.endText();
            }

            contentStream4.beginText();
            contentStream4.setFont(font, 15);
            contentStream4.newLineAtOffset(300, 568);
            contentStream4.showText(String.valueOf(accountingPapers));
            contentStream4.endText();

            contentStream4.beginText();
            contentStream4.setFont(font, 15);
            contentStream4.newLineAtOffset(300, 518);
            contentStream4.showText(accountingType);
            contentStream4.endText();

            contentStream4.beginText();
            contentStream4.setFont(font, 15);
            contentStream4.newLineAtOffset(300, 287);
            contentStream4.showText(patentRegistration + " рублей");
            contentStream4.endText();

            contentStream4.beginText();
            contentStream4.setFont(font, 15);
            contentStream4.newLineAtOffset(300, 230);
            contentStream4.showText(entityRegistration + " рублей");
            contentStream4.endText();

            contentStream4.beginText();
            contentStream4.setFont(font, 15);
            contentStream4.newLineAtOffset(300, 140);
            contentStream4.showText(accounting + " рублей");
            contentStream4.endText();

            contentStream5.beginText();
            contentStream5.setFont(font, 15);
            contentStream5.newLineAtOffset(300, 388);
            contentStream5.showText(engineerOnce + " рублей");
            contentStream5.endText();

            contentStream5.beginText();
            contentStream5.setFont(font, 15);
            contentStream5.newLineAtOffset(300, 341);
            contentStream5.showText(equipment + " рублей");
            contentStream5.endText();

            contentStream5.beginText();
            contentStream5.setFont(font, 15);
            contentStream5.newLineAtOffset(300, 228);
            contentStream5.showText(engineerYear + " рублей");
            contentStream5.endText();

            contentStream5.beginText();
            contentStream5.setFont(font, 15);
            contentStream5.newLineAtOffset(300, 173);
            contentStream5.showText(ammortisation + " рублей");
            contentStream5.endText();

            contentStream.close();
            contentStream2.close();
            contentStream3.close();
            contentStream4.close();
            contentStream5.close();

            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            document.save(outputStream);
            document.close();
            return outputStream;
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

}
