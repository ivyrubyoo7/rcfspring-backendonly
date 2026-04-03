<<<<<<< HEAD
package com.rcfl.rcfspring.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "permitpersonnel")
public class PermitPersonnel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "permit_id")
    private WorkPermit permit;

    private String name;
    private String role;
    private String employeeId;

    // getters & setters
=======
package com.rcfl.rcfspring.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "permitpersonnel")
public class PermitPersonnel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "permit_id")
    private WorkPermit permit;

    private String name;
    private String role;
    private String employeeId;

    // getters & setters
>>>>>>> a5738637bd136429337237ffc679f7eedef8c1aa
}