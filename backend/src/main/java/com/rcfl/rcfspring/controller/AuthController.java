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
@CrossOrigin(origins = "*")
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
       RESPONSE DTO (MOVE THIS UP)
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

    /* =====================================
       LOGIN
       ===================================== */

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(
            @Valid @RequestBody LoginRequest request
    ) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        UserDetails userDetails =
                customUserDetailsService.loadUserByUsername(request.getEmail());

        String token = tokenUtil.generateToken(userDetails);

        LoginResponse response = authService.login(request);
        response.setToken(token);

        return ResponseEntity.ok(response);
    }

    /* =====================================
       CHANGE PASSWORD
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
}