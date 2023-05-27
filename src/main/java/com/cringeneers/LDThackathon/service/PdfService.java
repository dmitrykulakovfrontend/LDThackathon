package com.cringeneers.LDThackathon.service;

import java.io.File;
import java.io.IOException;
import java.math.BigInteger;

import com.cringeneers.LDThackathon.dto.InvestRequestDto;
import com.cringeneers.LDThackathon.dto.InvestResponseDto;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.font.PDFont;
import org.apache.pdfbox.pdmodel.font.PDType0Font;
import org.springframework.stereotype.Service;

@Service
public class PdfService {

    public void makePDF(InvestRequestDto investRequestDto, InvestResponseDto investResponseDto) {
        BigInteger medic = investResponseDto.getMedic().toBigInteger();
        BigInteger retire = investResponseDto.getRetire().toBigInteger();
        Integer options = 100000;
        BigInteger total = investResponseDto.getTotal().toBigInteger();
        BigInteger personal = investResponseDto.getSalaries().toBigInteger();
        BigInteger taxes = BigInteger.valueOf(investResponseDto.getLandTax().intValue() + investResponseDto.getPropertyTax().intValue());
        BigInteger building_rent = investResponseDto.getBuilding().toBigInteger();
        String business_type = investRequestDto.getBusiness_type();
        String organisation_type = investRequestDto.getEntity();
        long employees_number = investRequestDto.getN_employee();
        String district = investRequestDto.getDistrict();
        insertNumbersInTemplate(medic, retire, options, total, personal, taxes, building_rent, business_type, organisation_type, employees_number, district);
    }
    public static void insertNumbersInTemplate(BigInteger medic, BigInteger retire, Integer options, BigInteger total, BigInteger personal, BigInteger taxes, BigInteger building_rent, String business_type, String organisation_type, long employeesNumber, String district) {
        try (PDDocument document = PDDocument.load(new File("template.pdf"))) {
            PDPage page = document.getPage(2); // Получаем первую страницу
            PDPage nextPage = document.getPage(3); // Получаем первую страницу
            PDFont font = PDType0Font.load(document, new File("azbuka01.TTF"));

            PDPageContentStream contentStream = new PDPageContentStream(document, page, PDPageContentStream.AppendMode.APPEND, true, true);
            PDPageContentStream contentStream2 = new PDPageContentStream(document, nextPage, PDPageContentStream.AppendMode.APPEND, true, true);


            // Вставляем число 1
            contentStream.beginText();
            contentStream.setFont(font, 20);
            contentStream.newLineAtOffset(350, 365); // Установите координаты для позиции вставки числа
            contentStream.showText(String.valueOf(total) + " рублей");
            contentStream.endText();

            // Вставляем число 2
            contentStream.beginText();
            contentStream.setFont(font, 20);
            contentStream.newLineAtOffset(350, 270); // Установите координаты для позиции вставки числа
            contentStream.showText(String.valueOf(personal) + " рублей");
            contentStream.endText();

            contentStream.beginText();
            contentStream.setFont(font, 20);
            contentStream.newLineAtOffset(350, 170); // Установите координаты для позиции вставки числа
            contentStream.showText(String.valueOf(taxes) + " рублей");
            contentStream.endText();

            contentStream.beginText();
            contentStream.setFont(font, 20);
            contentStream.newLineAtOffset(350, 220); // Установите координаты для позиции вставки числа
            contentStream.showText(String.valueOf(building_rent) + " рублей");
            contentStream.endText();

            contentStream.beginText();
            contentStream.setFont(font, 20);
            contentStream.newLineAtOffset(350, 120); // Установите координаты для позиции вставки числа
            contentStream.showText(String.valueOf(options) + " рублей");
            contentStream.endText();

            contentStream.beginText();
            contentStream.setFont(font, 20);
            contentStream.newLineAtOffset(300, 465); // Установите координаты для позиции вставки числа
            contentStream.showText(String.valueOf(district));
            contentStream.endText();

            contentStream.beginText();
            contentStream.setFont(font, 20);
            contentStream.newLineAtOffset(350, 525); // Установите координаты для позиции вставки числа
            contentStream.showText(String.valueOf(employeesNumber) + " человек(а)");
            contentStream.endText();

            contentStream.beginText();
            contentStream.setFont(font, 20);
            contentStream.newLineAtOffset(350, 590); // Установите координаты для позиции вставки числа
            contentStream.showText(String.valueOf(organisation_type));
            contentStream.endText();

            contentStream.beginText();
            contentStream.setFont(font, 20);
            contentStream.newLineAtOffset(250, 660); // Установите координаты для позиции вставки числа
            contentStream.showText(String.valueOf(business_type));
            contentStream.endText();

            contentStream2.beginText();
            contentStream2.setFont(font, 20);
            contentStream2.newLineAtOffset(350, 140); // Установите координаты для позиции вставки числа
            contentStream2.showText(String.valueOf(medic) + " рублей");
            contentStream2.endText();

            contentStream2.beginText();
            contentStream2.setFont(font, 20);
            contentStream2.newLineAtOffset(350, 210); // Установите координаты для позиции вставки числа
            contentStream2.showText(String.valueOf(retire) + " рублей");
            contentStream2.endText();

            contentStream2.beginText();
            contentStream2.setFont(font, 20);
            contentStream2.newLineAtOffset(350, 280); // Установите координаты для позиции вставки числа
            contentStream2.showText(String.valueOf(employeesNumber) + " человек(а)");
            contentStream2.endText();

            contentStream2.beginText();
            contentStream2.setFont(font, 20);
            contentStream2.newLineAtOffset(350, 340); // Установите координаты для позиции вставки числа
            contentStream2.showText(String.valueOf(personal) + " рублей");
            contentStream2.endText();

            contentStream.close();
            contentStream2.close();

            document.save(new File("templateNew.pdf"));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
