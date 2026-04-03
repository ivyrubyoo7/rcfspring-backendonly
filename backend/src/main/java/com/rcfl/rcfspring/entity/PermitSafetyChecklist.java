package com.rcfl.rcfspring.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "permit_safety_checklist")
public class PermitSafetyChecklist {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "permit_id")
    private WorkPermit permit;

    @Column(columnDefinition = "TEXT")
    private String checklistItem;

    private Boolean isChecked;

    // getters & setters
}