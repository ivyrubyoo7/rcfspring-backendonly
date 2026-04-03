<<<<<<< HEAD
package com.rcfl.rcfspring.repository;

import com.rcfl.rcfspring.entity.Plant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PlantRepository extends JpaRepository<Plant, Long> {

    // Since Plant now only has "name"
    Optional<Plant> findByName(String name);

=======
package com.rcfl.rcfspring.repository;

import com.rcfl.rcfspring.entity.Plant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PlantRepository extends JpaRepository<Plant, Long> {

    // Since Plant now only has "name"
    Optional<Plant> findByName(String name);

>>>>>>> a5738637bd136429337237ffc679f7eedef8c1aa
}