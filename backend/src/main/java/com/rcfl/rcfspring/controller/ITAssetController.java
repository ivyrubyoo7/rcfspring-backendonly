package com.rcfl.rcfspring.controller;

import com.rcfl.rcfspring.entity.ITAsset;
import com.rcfl.rcfspring.service.ITAssetService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/assets")
@CrossOrigin(origins = "http://localhost:5173")
public class ITAssetController {

    private final ITAssetService itAssetService;

    public ITAssetController(ITAssetService itAssetService) {
        this.itAssetService = itAssetService;
    }

    /* ==
       TEST ENDPOINT (for debugging)
       == */

    @GetMapping("/test")
    public String test() {
        return "IT Asset Controller Working";
    }

    /* ==
       CREATE ASSET
       == */

    @PostMapping
    public ResponseEntity<ITAsset> createAsset(@RequestBody CreateAssetRequest request) {

        ITAsset asset = itAssetService.createAsset(
                request.getAssetType(),
                request.getBrand(),
                request.getDeviceNumber(),
                request.getPlantId(),        // now safely parsed
                request.getDepartmentId(),   // now safely parsed
                request.getIncharge(),
                request.getReason(),
                request.getStatus()
        );

        return ResponseEntity.ok(asset);
    }

    /* ==
       GET ALL ASSETS
       == */

    @GetMapping
    public ResponseEntity<List<ITAsset>> getAllAssets() {

        List<ITAsset> assets = itAssetService.getAllAssets();

        return ResponseEntity.ok(assets);
    }

    /* ==
       GET ASSET BY ID
       == */

    @GetMapping("/{id}")
    public ResponseEntity<ITAsset> getAssetById(@PathVariable Long id) {

        ITAsset asset = itAssetService.getAssetById(id);

        return ResponseEntity.ok(asset);
    }

    /* ==
       UPDATE ASSET
       == */

    @PutMapping("/{id}")
    public ResponseEntity<ITAsset> updateAsset(
            @PathVariable Long id,
            @RequestBody CreateAssetRequest request
    ) {

        ITAsset asset = itAssetService.updateAsset(
                id,
                request.getAssetType(),
                request.getBrand(),
                request.getDeviceNumber(),
                request.getPlantId(),
                request.getDepartmentId(),
                request.getIncharge(),
                request.getReason(),
                request.getStatus()
        );

        return ResponseEntity.ok(asset);
    }

    /* ==
       DELETE ASSET
       == */

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteAsset(@PathVariable Long id) {

        itAssetService.deleteAsset(id);

        return ResponseEntity.ok("Asset deleted successfully");
    }

    /* ==
       REQUEST DTO
       == */

    public static class CreateAssetRequest {

        private String assetType;
        private String brand;
        private String deviceNumber;

        // Accept as String so "" from frontend doesn't crash Spring
        private String plantId;
        private String departmentId;

        private String incharge;
        private String reason;
        private String status;

        public String getAssetType() { return assetType; }
        public void setAssetType(String assetType) { this.assetType = assetType; }

        public String getBrand() { return brand; }
        public void setBrand(String brand) { this.brand = brand; }

        public String getDeviceNumber() { return deviceNumber; }
        public void setDeviceNumber(String deviceNumber) { this.deviceNumber = deviceNumber; }

        // Safe conversion for plantId (can be null / empty)
        public Long getPlantId() {
            if (plantId == null || plantId.isBlank()) return null;
            return Long.parseLong(plantId);
        }

        public void setPlantId(String plantId) {
            this.plantId = plantId;
        }

        // Safe conversion for departmentId
        public Long getDepartmentId() {
            if (departmentId == null || departmentId.isBlank()) return null;
            return Long.parseLong(departmentId);
        }

        public void setDepartmentId(String departmentId) {
            this.departmentId = departmentId;
        }

        public String getIncharge() { return incharge; }
        public void setIncharge(String incharge) { this.incharge = incharge; }

        public String getReason() { return reason; }
        public void setReason(String reason) { this.reason = reason; }

        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }
    }
package com.rcfl.rcfspring.controller;

import com.rcfl.rcfspring.entity.ITAsset;
import com.rcfl.rcfspring.service.ITAssetService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/assets")
@CrossOrigin(origins = "http://localhost:5173")
public class ITAssetController {

    private final ITAssetService itAssetService;

    public ITAssetController(ITAssetService itAssetService) {
        this.itAssetService = itAssetService;
    }

    /* ==
       TEST ENDPOINT (for debugging)
       == */

    @GetMapping("/test")
    public String test() {
        return "IT Asset Controller Working";
    }

    /* ==
       CREATE ASSET
       == */

    @PostMapping
    public ResponseEntity<ITAsset> createAsset(@RequestBody CreateAssetRequest request) {

        ITAsset asset = itAssetService.createAsset(
                request.getAssetType(),
                request.getBrand(),
                request.getDeviceNumber(),
                request.getPlantId(),        // now safely parsed
                request.getDepartmentId(),   // now safely parsed
                request.getIncharge(),
                request.getReason(),
                request.getStatus()
        );

        return ResponseEntity.ok(asset);
    }

    /* ==
       GET ALL ASSETS
       == */

    @GetMapping
    public ResponseEntity<List<ITAsset>> getAllAssets() {

        List<ITAsset> assets = itAssetService.getAllAssets();

        return ResponseEntity.ok(assets);
    }

    /* ==
       GET ASSET BY ID
       == */

    @GetMapping("/{id}")
    public ResponseEntity<ITAsset> getAssetById(@PathVariable Long id) {

        ITAsset asset = itAssetService.getAssetById(id);

        return ResponseEntity.ok(asset);
    }

    /* ==
       UPDATE ASSET
       == */

    @PutMapping("/{id}")
    public ResponseEntity<ITAsset> updateAsset(
            @PathVariable Long id,
            @RequestBody CreateAssetRequest request
    ) {

        ITAsset asset = itAssetService.updateAsset(
                id,
                request.getAssetType(),
                request.getBrand(),
                request.getDeviceNumber(),
                request.getPlantId(),
                request.getDepartmentId(),
                request.getIncharge(),
                request.getReason(),
                request.getStatus()
        );

        return ResponseEntity.ok(asset);
    }

    /* ==
       DELETE ASSET
       == */

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteAsset(@PathVariable Long id) {

        itAssetService.deleteAsset(id);

        return ResponseEntity.ok("Asset deleted successfully");
    }

    /* ==
       REQUEST DTO
       == */

    public static class CreateAssetRequest {

        private String assetType;
        private String brand;
        private String deviceNumber;

        // Accept as String so "" from frontend doesn't crash Spring
        private String plantId;
        private String departmentId;

        private String incharge;
        private String reason;
        private String status;

        public String getAssetType() { return assetType; }
        public void setAssetType(String assetType) { this.assetType = assetType; }

        public String getBrand() { return brand; }
        public void setBrand(String brand) { this.brand = brand; }

        public String getDeviceNumber() { return deviceNumber; }
        public void setDeviceNumber(String deviceNumber) { this.deviceNumber = deviceNumber; }

        // Safe conversion for plantId (can be null / empty)
        public Long getPlantId() {
            if (plantId == null || plantId.isBlank()) return null;
            return Long.parseLong(plantId);
        }

        public void setPlantId(String plantId) {
            this.plantId = plantId;
        }

        // Safe conversion for departmentId
        public Long getDepartmentId() {
            if (departmentId == null || departmentId.isBlank()) return null;
            return Long.parseLong(departmentId);
        }

        public void setDepartmentId(String departmentId) {
            this.departmentId = departmentId;
        }

        public String getIncharge() { return incharge; }
        public void setIncharge(String incharge) { this.incharge = incharge; }

        public String getReason() { return reason; }
        public void setReason(String reason) { this.reason = reason; }

        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }
    }
}