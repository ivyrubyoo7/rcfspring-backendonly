package com.rcfl.rcfspring.service;

import com.rcfl.rcfspring.dto.request.*;
import com.rcfl.rcfspring.entity.*;
import com.rcfl.rcfspring.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class WorkPermitService {

    private final WorkPermitRepository workPermitRepository;
    private final PermitDepartmentRepository permitDepartmentRepository;
    private final PermitPersonnelRepository permitPersonnelRepository;
    private final PermitSafetyChecklistRepository permitSafetyRepository;

    private final UserRepository userRepository;
    private final PlantRepository plantRepository;
    private final DepartmentRepository departmentRepository;

    // ================= CREATE PERMIT =================

    public WorkPermit createPermit(WorkPermitRequest request, Long userId) {

        User creator = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // ✅ PLANT ONLY (NO department dependency)
        Plant plant;

        if (creator.getPlant() != null) {
            plant = creator.getPlant();
        } else {
            plant = plantRepository.findById(request.getPlantId())
                    .orElseThrow(() -> new RuntimeException("Plant not found"));
        }

        WorkPermit permit = new WorkPermit();

        // Generate permit code
        String newPermitCode = "PTW-000001";
        WorkPermit lastPermit = workPermitRepository.findTopByOrderByIdDesc().orElse(null);

        if (lastPermit != null && lastPermit.getPermitCode() != null) {
            int lastNumber = Integer.parseInt(lastPermit.getPermitCode().split("-")[1]);
            newPermitCode = String.format("PTW-%06d", lastNumber + 1);
        }

        permit.setPermitCode(newPermitCode);
        permit.setPlant(plant);
        permit.setZone(request.getZone());
        permit.setActivity(request.getActivity());
        permit.setWorkCategory(request.getWorkCategory());
        permit.setCreatedBy(creator);
        permit.setCreatedAt(LocalDateTime.now());
        permit.setUpdatedAt(LocalDateTime.now());
        permit.setStatus("PENDING");

        String workCategory = request.getWorkCategory().toUpperCase();

        // ================= FLEXIBLE ASSIGNMENT =================
        // No failure if not found

        User manager = userRepository.findAll().stream()
                .filter(u -> u.getRole() != null)
                .filter(u -> u.getRole().getName() != null)
                .filter(u -> u.getRole().getName().toUpperCase().contains("MANAGER"))
                .filter(u -> u.getPlant() != null)
                .filter(u -> u.getPlant().getId().equals(plant.getId()))
                .findFirst()
                .orElse(null);

        User officer = userRepository.findAll().stream()
                .filter(u -> u.getRole() != null)
                .filter(u -> u.getRole().getName() != null)
                .filter(u -> u.getRole().getName().toUpperCase().contains("OFFICER"))
                .filter(u -> u.getPlant() != null)
                .filter(u -> u.getPlant().getId().equals(plant.getId()))
                .findFirst()
                .orElse(null);

        // Assign if available (no crash)
        if ("STANDARD".equals(workCategory)) {
            permit.setAssignedManager(manager);
        } else {
            permit.setAssignedOfficer(officer);
        }

        // ================= SAVE =================

        WorkPermit savedPermit = workPermitRepository.save(permit);

        // Departments (still saved but NOT used for logic)
        if (request.getDepartmentIds() != null) {
            request.getDepartmentIds().forEach(deptId -> {
                Department dept = departmentRepository.findById(deptId)
                        .orElseThrow(() -> new RuntimeException("Department not found"));

                PermitDepartment pd = new PermitDepartment();
                pd.setPermit(savedPermit);
                pd.setDepartment(dept);
                permitDepartmentRepository.save(pd);
            });
        }

        // Personnel
        if (request.getPersonnel() != null) {
            request.getPersonnel().forEach(p -> {
                PermitPersonnel person = new PermitPersonnel();
                person.setPermit(savedPermit);
                person.setName(p.getName());
                person.setRole(p.getRole());
                person.setEmployeeId(p.getEmployeeId());
                permitPersonnelRepository.save(person);
            });
        }

        // Safety
        if (request.getSafetyChecklist() != null) {
            request.getSafetyChecklist().forEach(s -> {
                PermitSafetyChecklist safety = new PermitSafetyChecklist();
                safety.setPermit(savedPermit);
                safety.setChecklistItem(s.getChecklistItem());
                safety.setIsChecked(s.getIsChecked());
                permitSafetyRepository.save(safety);
            });
        }

        return savedPermit;
    }

    // ================= ACTIVE =================
    public List<WorkPermit> getActivePermits(User user) {

        String role = user.getRole().getName();

        // 🔥 ADMIN → see all
        if (role.equalsIgnoreCase("ADMIN")) {
            return workPermitRepository.findAll();
        }

        // 🔥 OFFICER / MANAGER → only their plant
        Long plantId = user.getPlant().getId();

        return workPermitRepository.findByPlantId(plantId);
    }

    // ================= HISTORY =================
    public List<WorkPermit> getHistoryPermits() {
        return workPermitRepository.findByStatusIn(List.of("APPROVED", "REJECTED", "CLOSED"));
    }

    // ================= PENDING =================
    public List<WorkPermit> getPendingApprovals(Long userId, String role) {

        if (role.toUpperCase().contains("MANAGER")) {
            return workPermitRepository
                    .findByAssignedManager_IdAndStatus(userId, "PENDING");
        }

        if (role.toUpperCase().contains("OFFICER")) {
            return workPermitRepository
                    .findByAssignedOfficer_IdAndStatus(userId, "PENDING");
        }

        return List.of();
    }

    // ================= APPROVE =================
    public WorkPermit approvePermit(Long permitId, User approver) {

        WorkPermit permit = workPermitRepository.findById(permitId)
                .orElseThrow(() -> new RuntimeException("Permit not found"));

        permit.setStatus("APPROVED");
        permit.setApprovedBy(approver);
        permit.setUpdatedAt(LocalDateTime.now());

        return workPermitRepository.save(permit);
    }

    // ================= REJECT =================
    public WorkPermit rejectPermit(Long permitId, User approver) {

        WorkPermit permit = workPermitRepository.findById(permitId)
                .orElseThrow(() -> new RuntimeException("Permit not found"));

        permit.setStatus("REJECTED");
        permit.setApprovedBy(approver);
        permit.setUpdatedAt(LocalDateTime.now());

        return workPermitRepository.save(permit);
    }
}