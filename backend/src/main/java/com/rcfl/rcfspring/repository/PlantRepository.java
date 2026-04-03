package com.rcfl.rcfspring.repository;

import com.rcfl.rcfspring.entity.Plant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PlantRepository extends JpaRepository<Plant, Long> {

    // Since Plant now only has "name"
    Optional<Plant> findByName(String name);

}