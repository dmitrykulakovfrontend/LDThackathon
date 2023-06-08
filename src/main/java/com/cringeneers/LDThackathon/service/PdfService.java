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

@Service
public class PdfService {

    public PdfService() {
    }

    public ByteArrayOutputStream makePDF(InvestResult investResult) {
        Long medic = investResult.getMedic().longValue();
        Long retire = investResult.getRetire().longValue();
        Long total = investResult.getTotal().longValue();
        Long personal = investResult.getPersonal().longValue();
        Long landTaxes = investResult.getLandTaxes().longValue();
        Long propertyTaxes = investResult.getPropertyTaxes().longValue();
        Long building_rent = investResult.getBuilding_rent().longValue();
        Long land = investResult.getLand().longValue();
        Long engineerOnce = investResult.getEngineerOnce().longValue();
        Long engineerYear = investResult.getEngineerYear().longValue();
        Long ndfl = investResult.getNdfl().longValue();
        String business_type = investResult.getBusiness_type();
        Long district_price = investResult.getDistrict_price().longValue();
        Long totalOnce = investResult.getTotalOnce().longValue();
        Long totalYear = investResult.getTotalYear().longValue();
        Long square_area = investResult.getSquare_area();
        Long square_buildings = investResult.getSquare_buildings();
        Long accountingPapers = investResult.getAccountingPapers();
        Long patentRegistration = investResult.getPatentRegistration();
        Long entityRegistration = investResult.getEntityRegistration();
        Long accounting = investResult.getAccounting().longValue();
        Long equipment = investResult.getEquipment().longValue();
        Long ammortisation = investResult.getAmmortisation().longValue();

        String organisation_type = investResult.getOrganisationType();
        Long employees_number = investResult.getEmployees_number();
        String district = investResult.getDistrict();
        String accountingType = investResult.getAccountingType();
        return insertNumbersInTemplate(equipment, ammortisation, engineerYear, engineerOnce, patentRegistration, entityRegistration, accounting, accountingPapers, land, square_area, square_buildings, district_price ,ndfl, medic, retire, String.valueOf(accountingType), totalOnce, totalYear, total, personal, landTaxes, propertyTaxes, building_rent, business_type, String.valueOf(organisation_type), employees_number, district);
    }
    public ByteArrayOutputStream insertNumbersInTemplate(Long equipment, Long ammortisation, Long engineerYear, Long engineerOnce, Long patentRegistration , Long entityRegistration, Long accounting, Long accountingPapers, Long land, Long square_area, Long square_buildings, Long district_price , Long ndfl, Long medic, Long retire, String accountingType, Long totalOnce, Long totalYear, Long total, Long personal, Long landTax, Long propertyTax, Long building_rent, String business_type, String organisation_type, long employeesNumber, String district) {
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
            contentStream.showText(formatCurrency(total));
            contentStream.endText();

            contentStream.beginText();
            contentStream.setFont(font, 15);
            contentStream.newLineAtOffset(300, 452);
            contentStream.showText(String.valueOf(accountingType));
            contentStream.endText();

            contentStream.beginText();
            contentStream.setFont(font, 15);
            contentStream.newLineAtOffset(80, 248);
            contentStream.showText(formatCurrency(totalOnce));
            contentStream.endText();

            contentStream.beginText();
            contentStream.setFont(font, 15);
            contentStream.newLineAtOffset(330, 245);
            contentStream.showText(formatCurrency(totalYear));
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
            contentStream2.showText(formatCurrency(medic));
            contentStream2.endText();

            contentStream2.beginText();
            contentStream2.setFont(font, 15);
            contentStream2.newLineAtOffset(300, 250);
            contentStream2.showText(formatCurrency(ndfl));
            contentStream2.endText();

            contentStream2.beginText();
            contentStream2.setFont(font, 15);
            contentStream2.newLineAtOffset(300, 195);
            contentStream2.showText(formatCurrency(retire));
            contentStream2.endText();

            contentStream2.beginText();
            contentStream2.setFont(font, 15);
            contentStream2.newLineAtOffset(300, 400);
            contentStream2.showText(employeesNumber + " человек(а)");
            contentStream2.endText();

            contentStream2.beginText();
            contentStream2.setFont(font, 15);
            contentStream2.newLineAtOffset(300, 300);
            contentStream2.showText(formatCurrency(personal));
            contentStream2.endText();

            contentStream3.beginText();
            contentStream3.setFont(font, 15);
            contentStream3.newLineAtOffset(300, 674);
            contentStream3.showText(String.valueOf(district));
            contentStream3.endText();

            contentStream3.beginText();
            contentStream3.setFont(font, 15);
            contentStream3.newLineAtOffset(300, 623);
            contentStream3.showText(formatCurrency(district_price));
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
            contentStream3.showText(formatCurrency(land));
            contentStream3.endText();

            contentStream3.beginText();
            contentStream3.setFont(font, 15);
            contentStream3.newLineAtOffset(300, 290);
            contentStream3.showText(formatCurrency(building_rent));
            contentStream3.endText();

            contentStream3.beginText();
            contentStream3.setFont(font, 15);
            contentStream3.newLineAtOffset(300, 195);
            contentStream3.showText(formatCurrency(landTax));
            contentStream3.endText();

            contentStream3.beginText();
            contentStream3.setFont(font, 15);
            contentStream3.newLineAtOffset(300, 145);
            contentStream3.showText(formatCurrency(propertyTax));
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
            contentStream4.showText(formatCurrency(patentRegistration));
            contentStream4.endText();

            contentStream4.beginText();
            contentStream4.setFont(font, 15);
            contentStream4.newLineAtOffset(300, 230);
            contentStream4.showText(formatCurrency(entityRegistration));
            contentStream4.endText();

            contentStream4.beginText();
            contentStream4.setFont(font, 15);
            contentStream4.newLineAtOffset(300, 140);
            contentStream4.showText(formatCurrency(accounting));
            contentStream4.endText();

            contentStream5.beginText();
            contentStream5.setFont(font, 15);
            contentStream5.newLineAtOffset(300, 388);
            contentStream5.showText(formatCurrency(engineerOnce));
            contentStream5.endText();

            contentStream5.beginText();
            contentStream5.setFont(font, 15);
            contentStream5.newLineAtOffset(300, 341);
            contentStream5.showText(formatCurrency(equipment));
            contentStream5.endText();

            contentStream5.beginText();
            contentStream5.setFont(font, 15);
            contentStream5.newLineAtOffset(300, 228);
            contentStream5.showText(formatCurrency(engineerYear));
            contentStream5.endText();

            contentStream5.beginText();
            contentStream5.setFont(font, 15);
            contentStream5.newLineAtOffset(300, 173);
            contentStream5.showText(formatCurrency(ammortisation));
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
    private String formatCurrency(Long amount) {
        if (amount >= 1_000_000) {
            double millions = amount.doubleValue() / 1_000_000;
            return String.format("%.1f млн. рублей", millions);
        } else if (amount >= 1_000) {
            double thousands = amount.doubleValue() / 1_000;
            return String.format("%.1f тыс. рублей", thousands);
        } else {
            return String.format("%.0f рублей", amount.doubleValue());
        }
    }

}
