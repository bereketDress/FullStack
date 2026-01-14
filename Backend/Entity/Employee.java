package com.codeDemo.fullstack_backend.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter              // Creates: getId(), getFirstName(), getLastName(), getEmail()
@Setter              // Creates: setId(), setFirstName(), setLastName(), setEmail()
@NoArgsConstructor   // Creates: Employee()
@AllArgsConstructor  // Creates: Employee(id, firstName, lastName, email)
@Entity              // Makes this a database table
@Table(name = "employees")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "email_id", nullable = false, unique = true)
    private String email;
}