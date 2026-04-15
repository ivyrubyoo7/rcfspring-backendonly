package com.rcfl.rcfspring.repository;

import com.rcfl.rcfspring.entity.ITAsset;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ITAssetRepository extends JpaRepository<ITAsset, Long> {

    boolean existsByDeviceNumber(String deviceNumber);

    // 🔥 Plant + Department filtering (Officer / Manager)
    List<ITAsset> findByPlant_IdAndDepartment_Id(Long plantId, Long departmentId);

    // 🔥 Department only (Corporate users)
    List<ITAsset> findByDepartment_Id(Long departmentId);
}