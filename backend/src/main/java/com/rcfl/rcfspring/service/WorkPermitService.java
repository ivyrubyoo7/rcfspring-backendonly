<<<<<<< HEAD
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

        Plant plant = plantRepository.findById(request.getPlantId())
                .orElseThrow(() -> new RuntimeException("Plant not found"));

        WorkPermit permit = new WorkPermit();

        // ================= GENERATE PERMIT CODE =================

        String newPermitCode = "PTW-000001";

        WorkPermit lastPermit = workPermitRepository.findTopByOrderByIdDesc().orElse(null);

        if (lastPermit != null && lastPermit.getPermitCode() != null) {
            String lastCode = lastPermit.getPermitCode(); // PTW-000123
            int lastNumber = Integer.parseInt(lastCode.split("-")[1]);
            newPermitCode = String.format("PTW-%06d", lastNumber + 1);
        }

        permit.setPermitCode(newPermitCode);

        // ================= BASIC DETAILS =================

        permit.setPlant(plant);
        permit.setZone(request.getZone());
        permit.setActivity(request.getActivity());
        permit.setWorkCategory(request.getWorkCategory());

        permit.setCreatedBy(creator);
        permit.setCreatedAt(LocalDateTime.now());
        permit.setUpdatedAt(LocalDateTime.now());

        // ================= STATUS LOGIC =================

        if ("STANDARD".equalsIgnoreCase(request.getWorkCategory())) {

            permit.setStatus("PENDING");

            if (creator.getManager() != null) {
                User manager = userRepository.findById(creator.getManager().getId())
                        .orElseThrow(() -> new RuntimeException("Manager not found"));
                permit.setAssignedManager(manager);
            }

        } else if ("CRITICAL".equalsIgnoreCase(request.getWorkCategory())) {

            permit.setStatus("PENDING");

            User officer = userRepository.findAll().stream()
                    .filter(u -> u.getRole().getName().equalsIgnoreCase("OFFICER"))
                    .filter(u -> u.getPlant().getId().equals(plant.getId()))
                    .findFirst()
                    .orElseThrow(() -> new RuntimeException("Officer not found"));

            permit.setAssignedOfficer(officer);
        }

        // 💾 SAVE PERMIT FIRST
        WorkPermit savedPermit = workPermitRepository.save(permit);

        // ================= SAVE DEPARTMENTS =================
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

        // ================= SAVE PERSONNEL =================
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

        // ================= SAVE SAFETY =================
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

    // ================= GET ACTIVE =================

    public List<WorkPermit> getActivePermits() {
        return workPermitRepository.findByStatus("PENDING");
    }

    // ================= GET HISTORY =================

    public List<WorkPermit> getHistoryPermits() {
        return workPermitRepository.findByStatus("APPROVED");
    }
=======
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

        Plant plant = plantRepository.findById(request.getPlantId())
                .orElseThrow(() -> new RuntimeException("Plant not found"));

        WorkPermit permit = new WorkPermit();

        // ================= GENERATE PERMIT CODE =================

        String newPermitCode = "PTW-000001";

        WorkPermit lastPermit = workPermitRepository.findTopByOrderByIdDesc().orElse(null);

        if (lastPermit != null && lastPermit.getPermitCode() != null) {
            String lastCode = lastPermit.getPermitCode(); // PTW-000123
            int lastNumber = Integer.parseInt(lastCode.split("-")[1]);
            newPermitCode = String.format("PTW-%06d", lastNumber + 1);
        }

        permit.setPermitCode(newPermitCode);

        // ================= BASIC DETAILS =================

        permit.setPlant(plant);
        permit.setZone(request.getZone());
        permit.setActivity(request.getActivity());
        permit.setWorkCategory(request.getWorkCategory());

        permit.setCreatedBy(creator);
        permit.setCreatedAt(LocalDateTime.now());
        permit.setUpdatedAt(LocalDateTime.now());

        // ================= STATUS LOGIC =================

        if ("STANDARD".equalsIgnoreCase(request.getWorkCategory())) {

            permit.setStatus("PENDING");

            if (creator.getManager() != null) {
                User manager = userRepository.findById(creator.getManager().getId())
                        .orElseThrow(() -> new RuntimeException("Manager not found"));
                permit.setAssignedManager(manager);
            }

        } else if ("CRITICAL".equalsIgnoreCase(request.getWorkCategory())) {

            permit.setStatus("PENDING");

            User officer = userRepository.findAll().stream()
                    .filter(u -> u.getRole().getName().equalsIgnoreCase("OFFICER"))
                    .filter(u -> u.getPlant().getId().equals(plant.getId()))
                    .findFirst()
                    .orElseThrow(() -> new RuntimeException("Officer not found"));

            permit.setAssignedOfficer(officer);
        }

        // 💾 SAVE PERMIT FIRST
        WorkPermit savedPermit = workPermitRepository.save(permit);

        // ================= SAVE DEPARTMENTS =================
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

        // ================= SAVE PERSONNEL =================
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

        // ================= SAVE SAFETY =================
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

    // ================= GET ACTIVE =================

    public List<WorkPermit> getActivePermits() {
        return workPermitRepository.findByStatus("PENDING");
    }

    // ================= GET HISTORY =================

    public List<WorkPermit> getHistoryPermits() {
        return workPermitRepository.findByStatus("APPROVED");
    }
>>>>>>> a5738637bd136429337237ffc679f7eedef8c1aa
}