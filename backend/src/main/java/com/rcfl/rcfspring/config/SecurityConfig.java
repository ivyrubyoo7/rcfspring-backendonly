package com.rcfl.rcfspring.config;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import com.rcfl.rcfspring.security.CustomUserDetailsService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;

import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.security.web.SecurityFilterChain;

import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import com.rcfl.rcfspring.security.JwtAuthenticationFilter;
import com.rcfl.rcfspring.util.TokenUtil;

import java.util.List;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {

    private final CustomUserDetailsService customUserDetailsService;

    private final TokenUtil tokenUtil;

    public SecurityConfig(CustomUserDetailsService customUserDetailsService,
                      TokenUtil tokenUtil) {
        this.customUserDetailsService = customUserDetailsService;
        this.tokenUtil = tokenUtil;

    }

    /* ===
       PASSWORD ENCODER
       === */

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(10);
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {

        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();

        authProvider.setUserDetailsService(customUserDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());

        return authProvider;
    }

    /* ===
       SECURITY FILTER CHAIN
       === */

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http

                .cors(Customizer.withDefaults())
                .csrf(csrf -> csrf.disable())

                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .authenticationProvider(authenticationProvider())
                .userDetailsService(customUserDetailsService)

                .authorizeHttpRequests(auth -> auth

                        /* Public APIs */
                        .requestMatchers("/api/auth/**", "/test/**").permitAll()

                        /* Dropdown APIs */
                        .requestMatchers(
                                "/api/plants/**",
                                "/api/departments/**",
                                "/api/designations/**",
                                "/api/roles/**"
                        ).authenticated()

                        /* Permit creation by ADMIN OFFICER MANAGER */
                        .requestMatchers("/api/permits/**")
                        .hasAnyRole("ADMIN", "OFFICER", "MANAGER")

                        /* USERS API (ADMIN) */

                        .requestMatchers("/api/assets/**")
                        .hasAnyRole("ADMIN", "OFFICER")

                        /* Other Admin APIs (STRICT ADMIN ONLY) */
                        .requestMatchers("/api/admin/**")
                        .hasRole("ADMIN")

                        /* Officer APIs */
                        .requestMatchers("/api/officer/**")
                        .hasAnyRole("OFFICER", "ADMIN")

                        /* Manager APIs */
                        .requestMatchers("/api/manager/**")
                        .hasAnyRole("MANAGER", "ADMIN")

                        /* Employee APIs */
                        .requestMatchers("/api/employee/**")
                        .hasAnyRole("EMPLOYEE", "ADMIN")

                        /* Contractor APIs */
                        .requestMatchers("/api/contractor/**")
                        .hasAnyRole("CONTRACTOR", "ADMIN")

                        .anyRequest().authenticated()
                )

                .addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    /* ===
       CORS CONFIGURATION
       === */

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration = new CorsConfiguration();

        configuration.setAllowedOrigins(List.of("*"));
        configuration.setAllowedMethods(List.of(
                "GET",
                "POST",
                "PUT",
                "DELETE",
                "OPTIONS"
        ));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration("/**", configuration);

        return source;
    }

    /* ===
       AUTHENTICATION MANAGER
       === */

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config)
            throws Exception {
        return config.getAuthenticationManager();

        }

        /* ===
        JWT FILTER
        === */

    @Bean
    public JwtAuthenticationFilter jwtAuthenticationFilter() {
        return new JwtAuthenticationFilter(tokenUtil, customUserDetailsService);
    }
}