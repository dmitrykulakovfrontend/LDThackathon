package com.cringeneers.LDThackathon.service;

import com.cringeneers.LDThackathon.entity.Rate;
import com.cringeneers.LDThackathon.repository.RatesRepository;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Objects;

@Component
public class DataActualizer {
    private final RatesRepository ratesRepository;

    public DataActualizer(RatesRepository ratesRepository) {
        this.ratesRepository = ratesRepository;
    }

    @Scheduled(cron = "0 0 0 1 * ?") // запускать в полночь первого числа каждого месяца
    public void saveUlRegToDatabase() throws IOException {
        double ulReg = getUlReg();
        Rate rate = ratesRepository.findByRate("UL");
        rate.setValue(ulReg);
        ratesRepository.save(rate);
   }

    private double getUlReg() throws IOException {
        String url = "https://service.nalog.ru/gosreg/intro.html?sfrd=11001";
        Document doc = Jsoup.connect(url).get();
        Elements elements = doc.select("p:containsOwn(Размер государственной пошлины)");
        String text = Objects.requireNonNull(elements.first()).text();
        String[] parts = text.split(" ");
        String thousandsOfPatentRegistration = parts[parts.length - 8];
        String hundredsOfPatentRegistration = parts[parts.length - 7];
        return Double.parseDouble(thousandsOfPatentRegistration + hundredsOfPatentRegistration);
    }
}

