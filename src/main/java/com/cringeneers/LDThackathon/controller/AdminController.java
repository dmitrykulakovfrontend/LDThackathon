package com.cringeneers.LDThackathon.controller;

import com.cringeneers.LDThackathon.entity.Business;
import com.cringeneers.LDThackathon.entity.Equipment;
import com.cringeneers.LDThackathon.entity.User;
import com.cringeneers.LDThackathon.service.BusinessService;
import com.cringeneers.LDThackathon.service.EquipmentService;
import com.cringeneers.LDThackathon.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = { "*" }, methods = {RequestMethod.GET, RequestMethod.DELETE, RequestMethod.POST, RequestMethod.PUT, RequestMethod.OPTIONS}, allowCredentials = "false", allowedHeaders = { "*" }, exposedHeaders = { "*" })
@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private EquipmentService equipmentService;
    private BusinessService businessService;
    private UserService userService;

    @Autowired
    public AdminController(EquipmentService equipmentService, BusinessService businessService, UserService userService) {
        this.equipmentService = equipmentService;
        this.businessService = businessService;
        this.userService = userService;
    }


    @PostMapping("/equipment")
    public ResponseEntity<String> addEquipment(@RequestBody Equipment equipment) {
        equipmentService.createEquipment(equipment);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @PostMapping("/business")
    public ResponseEntity<String> addBusiness(@RequestBody Business business) {
        businessService.createBusiness(business);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers(){
        List<User> users = userService.getAllUsers();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

}
