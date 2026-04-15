package com.rcfl.rcfspring.security;

import com.rcfl.rcfspring.entity.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

public class CustomUserDetails implements UserDetails {

    private final User user;

    public CustomUserDetails(User user) {
        this.user = user;
    }

    /* =======================
       ROLE AUTHORITIES
       ======================= */

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {

        String roleName = user.getRole() != null
                ? user.getRole().getName()
                : "USER";

        return Collections.singletonList(
                new SimpleGrantedAuthority("ROLE_" + roleName)
        );
    }

    /* =======================
       USERNAME / PASSWORD
       ======================= */

    @Override
    public String getPassword() {
        return user.getPasswordHash();
    }

    @Override
    public String getUsername() {
        return user.getEmail();
    }

    /* =======================
       ACCOUNT STATUS
       ======================= */

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return user.getIsActive() != null && user.getIsActive();
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return user.getIsActive() != null && user.getIsActive();
    }

    /* =======================
       HELPER METHODS
       ======================= */

    public Long getUserId() {
        return user.getId();
    }

    public String getRole() {
        return user.getRole() != null
                ? user.getRole().getName()
                : null;
    }

    public Long getPlantId() {
        return user.getPlant() != null
                ? user.getPlant().getId()
                : null;
    }

    public Long getDepartmentId() {
        return user.getDepartment() != null
                ? user.getDepartment().getId()
                : null;
    }

    public Long getManagerId() {
        return user.getManager() != null
                ? user.getManager().getId()
                : null;
    }

    public User getUser() {
        return user;
    }
}   