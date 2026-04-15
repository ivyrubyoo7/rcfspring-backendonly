package com.rcfl.rcfspring.repository;

import com.rcfl.rcfspring.entity.Department;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DepartmentRepository extends JpaRepository<Department, Long> {
}
