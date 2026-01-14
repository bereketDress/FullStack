package com.codeDemo.fullstack_backend.repository;

import com.codeDemo.fullstack_backend.Entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository <Employee,Long>{
}
