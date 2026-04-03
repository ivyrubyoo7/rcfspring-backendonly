package com.rcfl.rcfspring.controller;

import com.rcfl.rcfspring.util.TokenUtil;
import com.rcfl.rcfspring.security.CustomUserDetailsService;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;

import com.rcfl.rcfspring.dto.request.LoginRequest;
import com.rcfl.rcfspring.dto.request.ChangePasswordRequest;
import com.rcfl.rcfspring.dto.response.LoginResponse;
import com.rcfl.rcfspring.service.AuthService;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final AuthService authService;
    private final AuthenticationManager authenticationManager;
    private final TokenUtil tokenUtil;
    private final CustomUserDetailsService customUserDetailsService;

    public AuthController(
            AuthService authService,
            AuthenticationManager authenticationManager,
            TokenUtil tokenUtil,
            CustomUserDetailsService customUserDetailsService
    ) {
        this.authService = authService;
        this.authenticationManager = authenticationManager;
        this.tokenUtil = tokenUtil;
        this.customUserDetailsService = customUserDetailsService;
    }

    /* =====================================
       LOGIN
       ===================================== */

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(
            @Valid @RequestBody LoginRequest request
    ) {

        // 🔐 Step 1: Authenticate (Spring handles password check)
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        // 🔐 Step 2: Load user details (for JWT)
        UserDetails userDetails =
                customUserDetailsService.loadUserByUsername(request.getEmail());

        // 🔐 Step 3: Generate token
        String token = tokenUtil.generateToken(userDetails);

        // 🔐 Step 4: Build response
        LoginResponse response = authService.login(request);

        // 🔐 Step 5: Attach token
        response.setToken(token);

        return ResponseEntity.ok(response);
    }

    /* =====================================
       CHANGE PASSWORD (FIRST LOGIN)
       ===================================== */

    @PostMapping("/change-password")
    public ResponseEntity<ChangePasswordResponse> changePassword(
            @Valid @RequestBody ChangePasswordRequest request
    ) {

        authService.changePassword(request);

        return ResponseEntity.ok(
                new ChangePasswordResponse("Password changed successfully")
        );
    }

    /* =====================================
       RESPONSE DTO
       ===================================== */

    public static class ChangePasswordResponse {

        private String message;

        public ChangePasswordResponse(String message) {
            this.message = message;
        }

        public String getMessage() {
            return message;
        }
    }
}