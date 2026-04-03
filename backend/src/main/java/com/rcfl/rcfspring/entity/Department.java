package com.rcfl.rcfspring.entity;

import jakarta.persistence.*;

@Entity
@Table(
        name = "departments",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "name")
        }
)
public class Department {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 150)
    private String name;

    /* =======================
       Getters & Setters
       ======================= */

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}