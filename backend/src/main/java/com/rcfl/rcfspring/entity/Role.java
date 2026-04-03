package com.rcfl.rcfspring.entity;

import jakarta.persistence.*;

@Entity
@Table(
        name = "roles",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "name")
        }
)
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 50, unique = true)
    private String name;

    /* =======================
       Constructors
       ======================= */

    public Role() {
    }

    public Role(String name) {
        this.name = name;
    }

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

    /* =======================
       toString (Optional but Helpful)
       ======================= */

    @Override
    public String toString() {
        return "Role{" +
                "id=" + id +
                ", name='" + name + '\'' +
                '}';
    }
}