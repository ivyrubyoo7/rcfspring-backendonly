
package com.rcfl.rcfspring.repository;

import com.rcfl.rcfspring.entity.ITAsset;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ITAssetRepository extends JpaRepository<ITAsset, Long> {

    boolean existsByDeviceNumber(String deviceNumber);


package com.rcfl.rcfspring.repository;

import com.rcfl.rcfspring.entity.ITAsset;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ITAssetRepository extends JpaRepository<ITAsset, Long> {

    boolean existsByDeviceNumber(String deviceNumber);

}