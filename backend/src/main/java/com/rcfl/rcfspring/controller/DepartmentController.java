<<<<<<< HEAD
package com.rcfl.rcfspring.controller;

import com.rcfl.rcfspring.entity.Department;
import com.rcfl.rcfspring.repository.DepartmentRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/departments")
public class DepartmentController {

    private final DepartmentRepository departmentRepository;

    public DepartmentController(DepartmentRepository departmentRepository) {
        this.departmentRepository = departmentRepository;
    }

    @GetMapping
    public List<Department> getAllDepartments() {
        return departmentRepository.findAll();
    }
=======
package com.rcfl.rcfspring.controller;

import com.rcfl.rcfspring.entity.Department;
import com.rcfl.rcfspring.repository.DepartmentRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/departments")
public class DepartmentController {

    private final DepartmentRepository departmentRepository;

    public DepartmentController(DepartmentRepository departmentRepository) {
        this.departmentRepository = departmentRepository;
    }

    @GetMapping
    public List<Department> getAllDepartments() {
        return departmentRepository.findAll();
    }
>>>>>>> a5738637bd136429337237ffc679f7eedef8c1aa
}