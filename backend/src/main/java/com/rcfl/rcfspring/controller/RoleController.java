<<<<<<< HEAD
package com.rcfl.rcfspring.controller;

import com.rcfl.rcfspring.entity.Role;
import com.rcfl.rcfspring.repository.RoleRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/roles")
public class RoleController {

    private final RoleRepository roleRepository;

    public RoleController(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @GetMapping
    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }
=======
package com.rcfl.rcfspring.controller;

import com.rcfl.rcfspring.entity.Role;
import com.rcfl.rcfspring.repository.RoleRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/roles")
public class RoleController {

    private final RoleRepository roleRepository;

    public RoleController(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @GetMapping
    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }
>>>>>>> a5738637bd136429337237ffc679f7eedef8c1aa
}