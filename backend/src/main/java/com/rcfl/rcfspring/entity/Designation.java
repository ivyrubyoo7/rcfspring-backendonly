<<<<<<< HEAD
package com.rcfl.rcfspring.entity;

import jakarta.persistence.*;

@Entity
@Table(
        name = "designations",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "name")
        }
)
public class Designation {

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
=======
package com.rcfl.rcfspring.entity;

import jakarta.persistence.*;

@Entity
@Table(
        name = "designations",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "name")
        }
)
public class Designation {

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
>>>>>>> a5738637bd136429337237ffc679f7eedef8c1aa
}