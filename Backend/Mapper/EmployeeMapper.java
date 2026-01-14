package com.codeDemo.fullstack_backend.Mapper;

import com.codeDemo.fullstack_backend.DTO.EmployeeDto;
import com.codeDemo.fullstack_backend.Entity.Employee;

public class EmployeeMapper {
    // we can map entity to dto or vice versa

    //sending data FROM database To client
    public static EmployeeDto mapToDto(Employee employee){
        return new EmployeeDto(
                employee.getId(),
                employee.getFirstName(),
                employee.getLastName(),
                employee.getEmail());

    }
    //receiving data FROM the client to save in a database
    public static Employee mapToEntity(EmployeeDto employeeDto){
        return new Employee(
                employeeDto.getId(),
                employeeDto.getFirstName(),
                employeeDto.getLastName(),
                employeeDto.getEmail()
        );
    }
}
