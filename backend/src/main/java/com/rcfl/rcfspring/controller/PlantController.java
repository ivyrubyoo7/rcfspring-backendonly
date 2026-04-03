package com.rcfl.rcfspring.controller;

import com.rcfl.rcfspring.entity.Plant;
import com.rcfl.rcfspring.repository.PlantRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/plants")
public class PlantController {

    private final PlantRepository plantRepository;

    public PlantController(PlantRepository plantRepository) {
        this.plantRepository = plantRepository;
    }

    @GetMapping
    public List<Plant> getAllPlants() {
        return plantRepository.findAll();
    }
}