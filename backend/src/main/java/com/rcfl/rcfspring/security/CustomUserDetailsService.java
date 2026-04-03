package com.rcfl.rcfspring.security;

import com.rcfl.rcfspring.entity.User;
import com.rcfl.rcfspring.repository.UserRepository;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        // Fetch user from database
        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new UsernameNotFoundException(
                                "User not found with email: " + email
                        )
                );

        // Check if account is active
        if (!user.getIsActive()) {
            throw new UsernameNotFoundException("User account is inactive");
        }

        // Return custom user details object
        return new CustomUserDetails(user);
    }
}