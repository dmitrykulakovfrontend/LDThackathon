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
    @GetMapping("/equipments")
    public ResponseEntity<List<Equipment>> getAllEquipments() {
        List<Equipment> equipments = equipmentService.getAllEquipments();
        return new ResponseEntity<>(equipments, HttpStatus.OK);
    }
    @GetMapping("/businesses")
    public ResponseEntity<List<Business>> getAllBusinesses() {
        List<Business> businesses = businessService.getAllBusinesess();
        return new ResponseEntity<>(businesses, HttpStatus.OK);
    }
    @PutMapping({"/updateEquipment"})
    public ResponseEntity<Equipment> updateEquipment(@RequestBody String type, Equipment equipment) {
        equipmentService.update(type, equipment);
        return new ResponseEntity<>(equipmentService.getEquipmentByType(type), HttpStatus.OK);
    }
    @PutMapping({"/updateBusiness"})
    public ResponseEntity<Business> updateBusiness(@RequestBody String type, Business business) {
        businessService.update(type, business);
        return new ResponseEntity<>(businessService.getBusinessByType(type), HttpStatus.OK);
    }
        @GetMapping({"/getEquipment"})
    public ResponseEntity<Equipment> getEquipment(@RequestBody String type) {
        return new ResponseEntity<>(equipmentService.getEquipmentByType(type), HttpStatus.OK);
    }
    @GetMapping({"/getBusiness"})
    public ResponseEntity<Business> getBusiness(@RequestBody String type) {
        return new ResponseEntity<>(businessService.getBusinessByType(type), HttpStatus.OK);
    }
    @DeleteMapping({"/deleteEquipment"})
    public ResponseEntity<Equipment> deleteEquipment(@RequestBody String type) {
        equipmentService.delete(type);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    @DeleteMapping({"/deleteBusiness"})
    public ResponseEntity<Business> deleteBusiness(@RequestBody String type) {
        businessService.delete(type);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
