package com.cringeneers.LDThackathon.controller;

import com.cringeneers.LDThackathon.entity.Business;
import com.cringeneers.LDThackathon.entity.Equipment;
import com.cringeneers.LDThackathon.entity.User;
import com.cringeneers.LDThackathon.repository.BusinessRepository;
import com.cringeneers.LDThackathon.repository.EquipmentRepository;
import com.cringeneers.LDThackathon.service.BusinessService;
import com.cringeneers.LDThackathon.service.EquipmentService;
import com.cringeneers.LDThackathon.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = { "*" }, methods = {RequestMethod.GET, RequestMethod.DELETE, RequestMethod.POST, RequestMethod.PUT, RequestMethod.OPTIONS}, allowCredentials = "false", allowedHeaders = { "*" }, exposedHeaders = { "*" })
@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private EquipmentService equipmentService;
    private BusinessService businessService;
    private UserService userService;
    private EquipmentRepository equipmentRepository;
    private BusinessRepository businessRepository;

    @Autowired
    public AdminController(EquipmentService equipmentService, BusinessService businessService, UserService userService, EquipmentRepository equipmentRepository, BusinessRepository businessRepository) {
        this.equipmentService = equipmentService;
        this.businessService = businessService;
        this.userService = userService;
        this.equipmentRepository = equipmentRepository;
        this.businessRepository = businessRepository;
    }


    @PostMapping("/equipment")
  public ResponseEntity<Equipment> createEquipment(@RequestBody Equipment equipment) {
    try {
      Equipment _equipment = equipmentRepository
          .save(new Equipment(equipment.getType(), equipment.getCost()));
      return new ResponseEntity<>(_equipment, HttpStatus.CREATED);
    } catch (Exception e) {
      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
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
    @PutMapping({"/equipment/{id}"})
    public ResponseEntity<Equipment> updateEquipment(@PathVariable("id") long id, @RequestBody Equipment equipment) {
        Optional<Equipment> equipmentData = equipmentService.getEquipment(id);
        if (equipmentData.isPresent()) {
            Equipment _equipment = equipmentData.get();
            _equipment.setType(equipment.getType());
            _equipment.setCost(equipment.getCost());
            return new ResponseEntity<>(equipmentRepository.save(_equipment), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @PutMapping({"/business/{id}"})
    public ResponseEntity<Business> updateBusiness(@PathVariable("id") long id, @RequestBody Business business) {
        Optional<Business> businessData = businessRepository.findById(id);
        if (businessData.isPresent()) {
            Business _business = businessData.get();
            _business.setType(business.getType());
            _business.setCost(business.getCost());
            _business.setMinimalSalary(business.getMinimalSalary());
            return new ResponseEntity<>(businessRepository.save(_business), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
        @GetMapping({"/equipment/{id}"})
    public ResponseEntity<Optional<Equipment>> getEquipment(@PathVariable("id") long id) {
        return new ResponseEntity<>(equipmentService.getEquipment(id), HttpStatus.OK);
    }
    @GetMapping({"/business/{id}"})
    public ResponseEntity<Business> getBusiness(@RequestBody String type) {
        return new ResponseEntity<>(businessService.getBusinessByType(type), HttpStatus.OK);
    }
    @DeleteMapping({"/equipment/{id}"})
    public ResponseEntity<HttpStatus> deleteEquipment(@PathVariable Long id) {
        try {
            equipmentRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @DeleteMapping({"/business/{id}"})
    public ResponseEntity<HttpStatus> deleteBusiness(@PathVariable Long id) {
        try {
            businessRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
