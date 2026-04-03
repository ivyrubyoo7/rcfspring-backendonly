package com.rcfl.rcfspring.repository;

import com.rcfl.rcfspring.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    /* =========================
       Authentication
       ========================= */

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);


    /* =========================
       ADMIN ACCESS
       ========================= */

    // Admin can access all users (via findAll())


    /* =========================
       OFFICER ACCESS
       ========================= */

    // All users within a plant
    List<User> findByPlant_Id(Long plantId);

    // Users within plant + department
    List<User> findByPlant_IdAndDepartment_Id(Long plantId, Long departmentId);


    /* =========================
       MANAGER ACCESS
       ========================= */

    // Users reporting to a manager
    List<User> findByManager_Id(Long managerId);

    // Users reporting to manager within same plant
    List<User> findByManager_IdAndPlant_Id(Long managerId, Long plantId);


    /* =========================
       EMPLOYEE / CONTRACTOR
       ========================= */

    // Self lookup with plant security
    Optional<User> findByIdAndPlant_Id(Long userId, Long plantId);


    /* =========================
       UTILITY
       ========================= */

    // Active users within a plant
    List<User> findByPlant_IdAndIsActiveTrue(Long plantId);

}