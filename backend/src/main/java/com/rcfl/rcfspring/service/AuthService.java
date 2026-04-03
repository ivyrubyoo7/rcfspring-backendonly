package com.rcfl.rcfspring.service;

import com.rcfl.rcfspring.dto.request.LoginRequest;
import com.rcfl.rcfspring.dto.request.ChangePasswordRequest;
import com.rcfl.rcfspring.dto.response.LoginResponse;
import com.rcfl.rcfspring.entity.User;
import com.rcfl.rcfspring.exception.CustomException;
import com.rcfl.rcfspring.repository.UserRepository;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    /* =====================================
       LOGIN RESPONSE BUILDER (NO AUTH LOGIC)
       ===================================== */

    public LoginResponse login(LoginRequest request) {

        User user = findByEmail(request.getEmail());

        return buildLoginResponse(user);
    }

    /* =====================================
       COMMON USER FETCH METHOD
       ===================================== */

    public User findByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new CustomException("User not found"));

        if (user.getIsActive() == null || !user.getIsActive()) {
            throw new CustomException("Account is disabled");
        }

        return user;
    }

    /* =====================================
       RESPONSE BUILDER
       ===================================== */

    public LoginResponse buildLoginResponse(User user) {

        LoginResponse response = new LoginResponse();

        response.setUserId(user.getId());
        response.setFullName(user.getFullName());
        response.setEmail(user.getEmail());

        if (user.getRole() != null) {
            response.setRole(user.getRole().getName());
        }

        if (user.getPlant() != null) {
            response.setPlantId(user.getPlant().getId());
        }

        if (user.getDepartment() != null) {
            response.setDepartmentId(user.getDepartment().getId());
        }

        response.setFirstLogin(user.getFirstLogin());

        if (Boolean.TRUE.equals(user.getFirstLogin())) {
            response.setMessage("First login detected. Please change password.");
        } else {
            response.setMessage("Login successful");
        }

        return response;
    }

    /* =====================================
       CHANGE PASSWORD (FIRST LOGIN)
       ===================================== */

    public void changePassword(ChangePasswordRequest request) {

        User user = findByEmail(request.getEmail());

        // Verify current password
        boolean matches = passwordEncoder.matches(
                request.getCurrentPassword(),
                user.getPasswordHash()
        );

        if (!matches) {
            throw new CustomException("Current password is incorrect");
        }

        // Encode new password
        user.setPasswordHash(
                passwordEncoder.encode(request.getNewPassword())
        );

        // Flip first login flag
        user.setFirstLogin(false);

        userRepository.save(user);
    }
}