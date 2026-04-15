package com.rcfl.rcfspring.controller;

import com.rcfl.rcfspring.dto.request.WorkPermitRequest;
import com.rcfl.rcfspring.entity.WorkPermit;
import com.rcfl.rcfspring.service.WorkPermitService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import com.rcfl.rcfspring.repository.UserRepository;
import com.rcfl.rcfspring.entity.User;

import java.util.List;

@RestController
@RequestMapping("/api/permits")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class WorkPermitController {

    private final WorkPermitService workPermitService;
    private final UserRepository userRepository;

    // ✅ Create Permit
    @PostMapping
    public ResponseEntity<WorkPermit> createPermit(@RequestBody WorkPermitRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        User user = userRepository.findByEmail(username)
            .orElseThrow(() -> new RuntimeException("User not found"));
        Long userId = user.getId();

        WorkPermit permit = workPermitService.createPermit(request, userId);
        return ResponseEntity.ok(permit);
    }

    // ✅ Get Active Permits
    @GetMapping("/active")
    public ResponseEntity<List<WorkPermit>> getActivePermits() {

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<WorkPermit> permits = workPermitService.getActivePermits(user);

        return ResponseEntity.ok(permits);
    }

    // ✅ Get History Permits
    @GetMapping("/history")
    public ResponseEntity<List<WorkPermit>> getHistoryPermits() {
        return ResponseEntity.ok(workPermitService.getHistoryPermits());
    }

    @GetMapping("/pending-approvals")
    public ResponseEntity<?> getPendingApprovals() {

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<WorkPermit> permits = workPermitService
                .getPendingApprovals(user.getId(), user.getRole().getName());

        return ResponseEntity.ok(permits);
    }
    // ✅ APPROVE PERMIT
    @PutMapping("/{id}/approve")
    public ResponseEntity<?> approvePermit(@PathVariable Long id) {

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        WorkPermit updated = workPermitService.approvePermit(id, user);

        return ResponseEntity.ok(updated);
    }

    // ✅ REJECT PERMIT
    @PutMapping("/{id}/reject")
    public ResponseEntity<?> rejectPermit(@PathVariable Long id) {

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        WorkPermit updated = workPermitService.rejectPermit(id, user);

        return ResponseEntity.ok(updated);
    }

}