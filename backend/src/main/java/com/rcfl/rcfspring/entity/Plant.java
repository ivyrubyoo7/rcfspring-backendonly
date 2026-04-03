
package com.rcfl.rcfspring.entity;

import jakarta.persistence.*;

@Entity
@Table(
        name = "plants",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "name")
        }
)
public class Plant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 150, unique = true)
    private String name;

    /* ==
       Constructors
       == */

    public Plant() {
    }

    public Plant(String name) {
        this.name = name;
    }

    /* ==
       Getters & Setters
       == */

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    /* ==
       toString (Helpful for Debug)
       == */

    @Override
    public String toString() {
        return "Plant{" +
                "id=" + id +
                ", name='" + name + '\'' +
                '}';
    }

package com.rcfl.rcfspring.entity;

import jakarta.persistence.*;

@Entity
@Table(
        name = "plants",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "name")
        }
)
public class Plant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 150, unique = true)
    private String name;

    /* ==
       Constructors
       == */

    public Plant() {
    }

    public Plant(String name) {
        this.name = name;
    }

    /* ==
       Getters & Setters
       == */

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    /* ==
       toString (Helpful for Debug)
       == */

    @Override
    public String toString() {
        return "Plant{" +
                "id=" + id +
                ", name='" + name + '\'' +
                '}';
    }
}