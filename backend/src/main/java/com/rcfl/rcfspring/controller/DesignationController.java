<<<<<<< HEAD
package com.rcfl.rcfspring.controller;

import com.rcfl.rcfspring.entity.Designation;
import com.rcfl.rcfspring.repository.DesignationRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/designations")
public class DesignationController {

    private final DesignationRepository designationRepository;

    public DesignationController(DesignationRepository designationRepository) {
        this.designationRepository = designationRepository;
    }

    @GetMapping
    public List<Designation> getAllDesignations() {
        return designationRepository.findAll();
    }
=======
package com.rcfl.rcfspring.controller;

import com.rcfl.rcfspring.entity.Designation;
import com.rcfl.rcfspring.repository.DesignationRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/designations")
public class DesignationController {

    private final DesignationRepository designationRepository;

    public DesignationController(DesignationRepository designationRepository) {
        this.designationRepository = designationRepository;
    }

    @GetMapping
    public List<Designation> getAllDesignations() {
        return designationRepository.findAll();
    }
>>>>>>> a5738637bd136429337237ffc679f7eedef8c1aa
}