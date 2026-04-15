package com.rcfl.rcfspring.repository;

import com.rcfl.rcfspring.entity.WorkPermit;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface WorkPermitRepository extends JpaRepository<WorkPermit, Long> {

    // ✅ Fetch permits by status
    List<WorkPermit> findByStatus(String status);

    // ✅ Get last inserted permit (for sequential ID generation)
    Optional<WorkPermit> findTopByOrderByIdDesc();

    List<WorkPermit> findByAssignedManager_IdAndStatus(Long managerId, String status);

    List<WorkPermit> findByAssignedOfficer_IdAndStatus(Long officerId, String status);

    List<WorkPermit> findByStatusIn(List<String> statuses);

    List<WorkPermit> findByPlantId(Long plantId);

}
