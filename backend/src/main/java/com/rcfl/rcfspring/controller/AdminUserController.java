package com.rcfl.rcfspring.controller;

import com.rcfl.rcfspring.dto.request.CreateUserRequest;
import com.rcfl.rcfspring.dto.response.UserResponse;
import com.rcfl.rcfspring.service.UserService;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/users")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminUserController {

    private final UserService userService;

    public AdminUserController(UserService userService) {
        this.userService = userService;
    }

        /* ==
       RESPONSE DTO
       == */

    public static class CreateUserResponse {

        private String message;
        private String temporaryPassword;

        public CreateUserResponse(String message, String temporaryPassword) {
            this.message = message;
            this.temporaryPassword = temporaryPassword;
        }

        public String getMessage() {
            return message;
        }

        public String getTemporaryPassword() {
            return temporaryPassword;
        }
    }

    /* ==
       CREATE USER (ADMIN ONLY)
       == */

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CreateUserResponse> createUser(
            @Valid @RequestBody CreateUserRequest request
    ) {

        String tempPassword = userService.createUser(request);

        CreateUserResponse response =
                new CreateUserResponse(
                        "User created successfully",
                        tempPassword
                );

        return ResponseEntity.ok(response);
    }

    /* ==
       GET ALL USERS
       ADMIN → All users
       OFFICER → Filtered by plant
       == */

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','OFFICER')")
    public ResponseEntity<List<UserResponse>> getAllUsers() {

        List<UserResponse> users = userService.getAllUsers();

        return ResponseEntity.ok(users);
    }

    /* ==
       GET USER BY ID
       == */

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','OFFICER')")
    public ResponseEntity<UserResponse> getUserById(@PathVariable Long id) {

        UserResponse user = userService.getUserById(id);

        return ResponseEntity.ok(user);
    }

    /* ==
       UPDATE USER (ADMIN ONLY)
       == */

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserResponse> updateUser(
            @PathVariable Long id,
            @Valid @RequestBody CreateUserRequest request
    ) {

        UserResponse updatedUser = userService.updateUser(id, request);

        return ResponseEntity.ok(updatedUser);
    }

    /* ==
       DELETE USER (ADMIN ONLY)
       == */

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {

        userService.deleteUser(id);

        return ResponseEntity.ok("User deleted successfully");
    }


}