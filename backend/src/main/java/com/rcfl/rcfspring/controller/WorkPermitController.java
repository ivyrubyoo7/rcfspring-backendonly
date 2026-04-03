package com.rcfl.rcfspring.controller;

import com.rcfl.rcfspring.dto.request.WorkPermitRequest;
import com.rcfl.rcfspring.entity.WorkPermit;
import com.rcfl.rcfspring.service.WorkPermitService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import com.rcfl.rcfspring.security.CustomUserDetails;

import java.util.List;

@RestController
@RequestMapping("/api/permits")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class WorkPermitController {

    private final WorkPermitService workPermitService;

    // ✅ Create Permit
    @PostMapping
    public ResponseEntity<WorkPermit> createPermit(@RequestBody WorkPermitRequest request) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();

        Long userId = userDetails.getUserId();  // 🔥 dynamic

        WorkPermit permit = workPermitService.createPermit(request, userId);
        return ResponseEntity.ok(permit);
    }

    // ✅ Get Active Permits
    @GetMapping("/active")
    public ResponseEntity<List<WorkPermit>> getActivePermits() {
        return ResponseEntity.ok(workPermitService.getActivePermits());
    }

    // ✅ Get History Permits
    @GetMapping("/history")
    public ResponseEntity<List<WorkPermit>> getHistoryPermits() {
        return ResponseEntity.ok(workPermitService.getHistoryPermits());
    }
package com.rcfl.rcfspring.controller;

import com.rcfl.rcfspring.dto.request.WorkPermitRequest;
import com.rcfl.rcfspring.entity.WorkPermit;
import com.rcfl.rcfspring.service.WorkPermitService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import com.rcfl.rcfspring.security.CustomUserDetails;

import java.util.List;

@RestController
@RequestMapping("/api/permits")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class WorkPermitController {

    private final WorkPermitService workPermitService;

    // ✅ Create Permit
    @PostMapping
    public ResponseEntity<WorkPermit> createPermit(@RequestBody WorkPermitRequest request) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();

        Long userId = userDetails.getUserId();  // 🔥 dynamic

        WorkPermit permit = workPermitService.createPermit(request, userId);
        return ResponseEntity.ok(permit);
    }

    // ✅ Get Active Permits
    @GetMapping("/active")
    public ResponseEntity<List<WorkPermit>> getActivePermits() {
        return ResponseEntity.ok(workPermitService.getActivePermits());
    }

    // ✅ Get History Permits
    @GetMapping("/history")
    public ResponseEntity<List<WorkPermit>> getHistoryPermits() {
        return ResponseEntity.ok(workPermitService.getHistoryPermits());
    }
}