
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
}