
package com.rcfl.rcfspring.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "permitdepartments")
public class PermitDepartment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "permit_id")
    private WorkPermit permit;

    @ManyToOne
    @JoinColumn(name = "department_id")
    private Department department;

    // getters & setters

package com.rcfl.rcfspring.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "permitdepartments")
public class PermitDepartment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "permit_id")
    private WorkPermit permit;

    @ManyToOne
    @JoinColumn(name = "department_id")
    private Department department;

    // getters & setters
}