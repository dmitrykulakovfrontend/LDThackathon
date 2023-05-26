package com.cringeneers.LDThackathon.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class SignUpDto {
    @NotBlank(message = "Необходимо указать имя")
    private String name;
    @Email(message = "Email должен быть корректным адресом электронной почты")
    private String email;
    @NotBlank(message = "Необходимо указать наименование организации")
    private String organisation;
    @NotBlank(message = "Необходимо указать ИНН")
    private String inn;
    private String website;
    private String country;
    private String city;
    @NotBlank(message = "Необходимо указать логин")
    private String business_type;
    private String job;
    @NotBlank(message = "Необходимо указать корректный пароль")
    @Size(min = 6)
    private String password;
}
