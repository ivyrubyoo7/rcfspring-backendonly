package com.rcfl.rcfspring.repository;

import com.rcfl.rcfspring.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    /* =========================
       Authentication
       ========================= */

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);

    @Query("""
        SELECT u FROM User u
        LEFT JOIN FETCH u.role
        LEFT JOIN FETCH u.designation
        LEFT JOIN FETCH u.department
        LEFT JOIN FETCH u.plant
    """)
    List<User> findAllWithRelations();
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

    // CORPORATE ACCESS (No plant → department only)
    List<User> findByDepartment_Id(Long departmentId);

    // Granular ABAC (optional)
    List<User> findByPlant_IdAndDepartment_IdAndDesignation_Id(
            Long plantId,
            Long departmentId,
            Long designationId
    );

    // Corporate + designations
    List<User> findByDepartment_IdAndDesignation_Id(
            Long departmentId,
            Long designationId
    );

    /* =========================
       MANAGER ACCESS
       ========================= */

    // Users reporting to a manager
    List<User> findByManager_Id(Long managerId);

    // Users reporting to manager within same plant
    List<User> findByManager_IdAndPlant_Id(Long managerId, Long plantId);

    // Manager → plant + department (for plant-based managers)
    List<User> findByManager_IdAndPlant_IdAndDepartment_Id(
            Long managerId,
            Long plantId,
            Long departmentId
    );

    // Manager → department only (for corporate managers)
    List<User> findByManager_IdAndDepartment_Id(
            Long managerId,
            Long departmentId
    );

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