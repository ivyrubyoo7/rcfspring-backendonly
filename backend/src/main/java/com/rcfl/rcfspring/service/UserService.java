package com.rcfl.rcfspring.service;

import com.rcfl.rcfspring.dto.request.CreateUserRequest;
import com.rcfl.rcfspring.dto.response.UserResponse;
import com.rcfl.rcfspring.entity.*;
import com.rcfl.rcfspring.exception.CustomException;
import com.rcfl.rcfspring.repository.*;
import com.rcfl.rcfspring.security.CustomUserDetails;
import com.rcfl.rcfspring.util.PasswordUtil;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final DesignationRepository designationRepository;
    private final DepartmentRepository departmentRepository;
    private final PlantRepository plantRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

    public UserService(
            UserRepository userRepository,
            RoleRepository roleRepository,
            DesignationRepository designationRepository,
            DepartmentRepository departmentRepository,
            PlantRepository plantRepository,
            PasswordEncoder passwordEncoder,
            EmailService emailService
    ) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.designationRepository = designationRepository;
        this.departmentRepository = departmentRepository;
        this.plantRepository = plantRepository;
        this.passwordEncoder = passwordEncoder;
        this.emailService = emailService;
    }

    /* ========================================
       CREATE USER (ADMIN FUNCTION)
       ======================================== */

    public String createUser(CreateUserRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new CustomException("Email already exists");
        }

        Role role = roleRepository.findById(request.getRoleId())
                .orElseThrow(() -> new CustomException("Invalid role"));

        Designation designation = designationRepository.findById(request.getDesignationId())
                .orElseThrow(() -> new CustomException("Invalid designation"));

        Department department = departmentRepository.findById(request.getDepartmentId())
                .orElseThrow(() -> new CustomException("Invalid department"));

        Plant plant = null;

        if (request.getPlantId() != null) {
            plant = plantRepository.findById(request.getPlantId())
                    .orElseThrow(() -> new CustomException("Invalid plant"));
        }

        String tempPassword = PasswordUtil.generateTempPassword();
        String hashedPassword = passwordEncoder.encode(tempPassword);

        User user = new User();

        user.setFullName(request.getFullName());
        user.setEmployeeId(request.getEmployeeId());
        user.setPhone(request.getPhone());
        user.setEmail(request.getEmail());
        user.setPasswordHash(hashedPassword);

        user.setRole(role);
        user.setDesignation(designation);
        user.setDepartment(department);
        user.setPlant(plant);

        user.setIsActive(true);
        user.setFirstLogin(true);

        if (request.getManagerId() != null) {
            User manager = userRepository.findById(request.getManagerId())
                    .orElseThrow(() -> new CustomException("Invalid manager"));

            user.setManager(manager);
        }

        userRepository.save(user);

        return tempPassword;
    }

    /* ==========================================
       GET ALL USERS (ROLE + PLANT + DEPARTMENT)
       ========================================== */

    public List<UserResponse> getAllUsers() {

        CustomUserDetails currentUser = getCurrentUser();

        String roleName = currentUser.getRole();

        List<User> users;

        if ("ADMIN".equalsIgnoreCase(roleName)) {

            users = userRepository.findAll();

        } else {

            Long plantId = currentUser.getPlantId();
            Long departmentId = currentUser.getDepartmentId();

            if (plantId == null || departmentId == null) {
                throw new CustomException("Officer must have plant and department assigned");
            }

            users = userRepository.findByPlant_IdAndDepartment_Id(plantId, departmentId);
        }

        return users.stream()
                .map(this::mapToUserResponse)
                .collect(Collectors.toList());
    }

    /* ========================================
       GET USER BY ID (SECURED)
       ======================================== */

    public UserResponse getUserById(Long id) {

        CustomUserDetails currentUser = getCurrentUser();

        User user = userRepository.findById(id)
                .orElseThrow(() -> new CustomException("User not found"));

        validateAccess(currentUser, user);

        return mapToUserResponse(user);
    }

    /* ========================================
       UPDATE USER (SECURED)
       ======================================== */

    public UserResponse updateUser(Long id, CreateUserRequest request) {

        CustomUserDetails currentUser = getCurrentUser();

        User user = userRepository.findById(id)
                .orElseThrow(() -> new CustomException("User not found"));

        validateAccess(currentUser, user);

        Role role = roleRepository.findById(request.getRoleId())
                .orElseThrow(() -> new CustomException("Invalid role"));

        Designation designation = designationRepository.findById(request.getDesignationId())
                .orElseThrow(() -> new CustomException("Invalid designation"));

        Department department = departmentRepository.findById(request.getDepartmentId())
                .orElseThrow(() -> new CustomException("Invalid department"));

        Plant plant = null;

        if (request.getPlantId() != null) {
            plant = plantRepository.findById(request.getPlantId())
                    .orElseThrow(() -> new CustomException("Invalid plant"));
        }

        user.setFullName(request.getFullName());
        user.setEmployeeId(request.getEmployeeId());
        user.setPhone(request.getPhone());
        user.setEmail(request.getEmail());

        user.setRole(role);
        user.setDesignation(designation);
        user.setDepartment(department);
        user.setPlant(plant);

        userRepository.save(user);

        return mapToUserResponse(user);
    }

    /* ========================================
       DELETE USER (SECURED)
       ======================================== */

    public void deleteUser(Long id) {

        CustomUserDetails currentUser = getCurrentUser();

        User user = userRepository.findById(id)
                .orElseThrow(() -> new CustomException("User not found"));

        validateAccess(currentUser, user);

        userRepository.delete(user);
    }

    /* ========================================
       ACCESS VALIDATION (CORE SECURITY)
       ======================================== */

    private void validateAccess(CustomUserDetails currentUser, User targetUser) {

        if ("ADMIN".equalsIgnoreCase(currentUser.getRole())) {
            return; // Admin can access everything
        }

        Long plantId = currentUser.getPlantId();
        Long departmentId = currentUser.getDepartmentId();

        Long targetPlantId = targetUser.getPlant() != null ? targetUser.getPlant().getId() : null;
        Long targetDeptId = targetUser.getDepartment() != null ? targetUser.getDepartment().getId() : null;

        if (!plantId.equals(targetPlantId) || !departmentId.equals(targetDeptId)) {
            throw new CustomException("Access denied: You can only access users from your department and plant");
        }
    }

    /* ========================================
       GET CURRENT USER
       ======================================== */

    private CustomUserDetails getCurrentUser() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            throw new CustomException("User not authenticated");
        }

        Object principal = authentication.getPrincipal();

        if (principal instanceof CustomUserDetails) {
            return (CustomUserDetails) principal;
        }

        throw new CustomException("Invalid authentication principal");
    }

    /* ========================================
       MAPPER METHOD
       ======================================== */

    private UserResponse mapToUserResponse(User user) {

        String roleName =
                user.getRole() != null ? user.getRole().getName() : null;

        String designationName =
                user.getDesignation() != null ? user.getDesignation().getName() : null;

        String departmentName =
                user.getDepartment() != null ? user.getDepartment().getName() : null;

        String plantName =
                user.getPlant() != null ? user.getPlant().getName() : null;

        return new UserResponse(
                user.getId(),
                user.getEmployeeId(),
                user.getFullName(),
                user.getEmail(),
                user.getPhone(),
                roleName,
                designationName,
                departmentName,
                plantName,
                user.getIsActive()
        );
    }
}