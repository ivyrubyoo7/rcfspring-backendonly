package com.rcfl.rcfspring.entity;

import lombok.Data;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Data
@Entity
@Table(name = "workpermits")
public class WorkPermit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // ================= PERMIT CODE =================
    @Column(name = "permit_code", unique = true, nullable = false)
    private String permitCode;

    // ================= BASIC DETAILS =================

    @ManyToOne
    @JoinColumn(name = "plant_id", nullable = false)
    private Plant plant;

    private String zone;

    @Column(columnDefinition = "TEXT")
    private String activity;

    private String workCategory; // STANDARD / CRITICAL

    private String status; // PENDING / APPROVED / ACTIVE / REJECTED

    // ================= USER RELATIONS =================
    @ManyToOne
    @JoinColumn(name = "created_by", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private User createdBy;

    @ManyToOne
    @JoinColumn(name = "assigned_manager")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private User assignedManager;

    @ManyToOne
    @JoinColumn(name = "assigned_officer")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private User assignedOfficer;

    @ManyToOne
    @JoinColumn(name = "approved_by")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private User approvedBy;

    // ================= TIMESTAMPS =================

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // ================= AUTO TIMESTAMP =================

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();

        if (this.status == null) {
            this.status = "PENDING";
        }
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}