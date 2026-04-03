
package com.rcfl.rcfspring.service;

import com.rcfl.rcfspring.entity.ITAsset;
import com.rcfl.rcfspring.entity.Plant;
import com.rcfl.rcfspring.entity.Department;
import com.rcfl.rcfspring.exception.CustomException;
import com.rcfl.rcfspring.repository.ITAssetRepository;
import com.rcfl.rcfspring.repository.PlantRepository;
import com.rcfl.rcfspring.repository.DepartmentRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ITAssetService {

    private final ITAssetRepository itAssetRepository;
    private final PlantRepository plantRepository;
    private final DepartmentRepository departmentRepository;

    public ITAssetService(
            ITAssetRepository itAssetRepository,
            PlantRepository plantRepository,
            DepartmentRepository departmentRepository
    ) {
        this.itAssetRepository = itAssetRepository;
        this.plantRepository = plantRepository;
        this.departmentRepository = departmentRepository;
    }

    /* ==
       CREATE ASSET
       == */

    public ITAsset createAsset(
            String assetType,
            String brand,
            String deviceNumber,
            Long plantId,
            Long departmentId,
            String incharge,
            String reason,
            String status
    ) {

        if (deviceNumber == null || deviceNumber.isBlank()) {
            throw new CustomException("Device number is required");
        }

        if (itAssetRepository.existsByDeviceNumber(deviceNumber)) {
            throw new CustomException("Device number already exists");
        }

        /* ---------- Plant (Optional) ---------- */

        Plant plant = null;

        if (plantId != null) {
            plant = plantRepository.findById(plantId)
                    .orElseThrow(() -> new CustomException("Invalid plant id: " + plantId));
        }

        /* ---------- Department (Required) ---------- */

        if (departmentId == null) {
            throw new CustomException("Department is required");
        }

        Department department = departmentRepository.findById(departmentId)
                .orElseThrow(() -> new CustomException("Invalid department id: " + departmentId));

        /* ---------- Create Asset ---------- */

        ITAsset asset = new ITAsset();

        asset.setAssetType(assetType);
        asset.setBrand(brand);
        asset.setDeviceNumber(deviceNumber);
        asset.setPlant(plant);
        asset.setDepartment(department);
        asset.setIncharge(incharge);
        asset.setReason(reason);
        asset.setStatus(status);

        return itAssetRepository.save(asset);
    }

    /* ==
       GET ALL ASSETS
       == */

    public List<ITAsset> getAllAssets() {
        return itAssetRepository.findAll();
    }

    /* ==
       GET ASSET BY ID
       == */

    public ITAsset getAssetById(Long id) {

        if (id == null) {
            throw new CustomException("Asset id cannot be null");
        }

        return itAssetRepository.findById(id)
                .orElseThrow(() -> new CustomException("Asset not found"));
    }

    /* ==
       UPDATE ASSET
       == */

    public ITAsset updateAsset(
            Long id,
            String assetType,
            String brand,
            String deviceNumber,
            Long plantId,
            Long departmentId,
            String incharge,
            String reason,
            String status
    ) {

        ITAsset asset = itAssetRepository.findById(id)
                .orElseThrow(() -> new CustomException("Asset not found"));

        /* ---------- Plant (Optional) ---------- */

        Plant plant = null;

        if (plantId != null) {
            plant = plantRepository.findById(plantId)
                    .orElseThrow(() -> new CustomException("Invalid plant id: " + plantId));
        }

        /* ---------- Department (Required) ---------- */

        if (departmentId == null) {
            throw new CustomException("Department is required");
        }

        Department department = departmentRepository.findById(departmentId)
                .orElseThrow(() -> new CustomException("Invalid department id: " + departmentId));

        asset.setAssetType(assetType);
        asset.setBrand(brand);
        asset.setDeviceNumber(deviceNumber);
        asset.setPlant(plant);
        asset.setDepartment(department);
        asset.setIncharge(incharge);
        asset.setReason(reason);
        asset.setStatus(status);

        return itAssetRepository.save(asset);
    }

    /* ==
       DELETE ASSET
       == */

    public void deleteAsset(Long id) {

        if (id == null) {
            throw new CustomException("Asset id cannot be null");
        }

        ITAsset asset = itAssetRepository.findById(id)
                .orElseThrow(() -> new CustomException("Asset not found"));

        itAssetRepository.delete(asset);
    }

package com.rcfl.rcfspring.service;

import com.rcfl.rcfspring.entity.ITAsset;
import com.rcfl.rcfspring.entity.Plant;
import com.rcfl.rcfspring.entity.Department;
import com.rcfl.rcfspring.exception.CustomException;
import com.rcfl.rcfspring.repository.ITAssetRepository;
import com.rcfl.rcfspring.repository.PlantRepository;
import com.rcfl.rcfspring.repository.DepartmentRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ITAssetService {

    private final ITAssetRepository itAssetRepository;
    private final PlantRepository plantRepository;
    private final DepartmentRepository departmentRepository;

    public ITAssetService(
            ITAssetRepository itAssetRepository,
            PlantRepository plantRepository,
            DepartmentRepository departmentRepository
    ) {
        this.itAssetRepository = itAssetRepository;
        this.plantRepository = plantRepository;
        this.departmentRepository = departmentRepository;
    }

    /* ==
       CREATE ASSET
       == */

    public ITAsset createAsset(
            String assetType,
            String brand,
            String deviceNumber,
            Long plantId,
            Long departmentId,
            String incharge,
            String reason,
            String status
    ) {

        if (deviceNumber == null || deviceNumber.isBlank()) {
            throw new CustomException("Device number is required");
        }

        if (itAssetRepository.existsByDeviceNumber(deviceNumber)) {
            throw new CustomException("Device number already exists");
        }

        /* ---------- Plant (Optional) ---------- */

        Plant plant = null;

        if (plantId != null) {
            plant = plantRepository.findById(plantId)
                    .orElseThrow(() -> new CustomException("Invalid plant id: " + plantId));
        }

        /* ---------- Department (Required) ---------- */

        if (departmentId == null) {
            throw new CustomException("Department is required");
        }

        Department department = departmentRepository.findById(departmentId)
                .orElseThrow(() -> new CustomException("Invalid department id: " + departmentId));

        /* ---------- Create Asset ---------- */

        ITAsset asset = new ITAsset();

        asset.setAssetType(assetType);
        asset.setBrand(brand);
        asset.setDeviceNumber(deviceNumber);
        asset.setPlant(plant);
        asset.setDepartment(department);
        asset.setIncharge(incharge);
        asset.setReason(reason);
        asset.setStatus(status);

        return itAssetRepository.save(asset);
    }

    /* ==
       GET ALL ASSETS
       == */

    public List<ITAsset> getAllAssets() {
        return itAssetRepository.findAll();
    }

    /* ==
       GET ASSET BY ID
       == */

    public ITAsset getAssetById(Long id) {

        if (id == null) {
            throw new CustomException("Asset id cannot be null");
        }

        return itAssetRepository.findById(id)
                .orElseThrow(() -> new CustomException("Asset not found"));
    }

    /* ==
       UPDATE ASSET
       == */

    public ITAsset updateAsset(
            Long id,
            String assetType,
            String brand,
            String deviceNumber,
            Long plantId,
            Long departmentId,
            String incharge,
            String reason,
            String status
    ) {

        ITAsset asset = itAssetRepository.findById(id)
                .orElseThrow(() -> new CustomException("Asset not found"));

        /* ---------- Plant (Optional) ---------- */

        Plant plant = null;

        if (plantId != null) {
            plant = plantRepository.findById(plantId)
                    .orElseThrow(() -> new CustomException("Invalid plant id: " + plantId));
        }

        /* ---------- Department (Required) ---------- */

        if (departmentId == null) {
            throw new CustomException("Department is required");
        }

        Department department = departmentRepository.findById(departmentId)
                .orElseThrow(() -> new CustomException("Invalid department id: " + departmentId));

        asset.setAssetType(assetType);
        asset.setBrand(brand);
        asset.setDeviceNumber(deviceNumber);
        asset.setPlant(plant);
        asset.setDepartment(department);
        asset.setIncharge(incharge);
        asset.setReason(reason);
        asset.setStatus(status);

        return itAssetRepository.save(asset);
    }

    /* ==
       DELETE ASSET
       == */

    public void deleteAsset(Long id) {

        if (id == null) {
            throw new CustomException("Asset id cannot be null");
        }

        ITAsset asset = itAssetRepository.findById(id)
                .orElseThrow(() -> new CustomException("Asset not found"));

        itAssetRepository.delete(asset);
    }
}