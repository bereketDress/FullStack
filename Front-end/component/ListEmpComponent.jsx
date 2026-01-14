import React, { useEffect, useState } from "react"
import { listEmployees, deleteEmployee as deleteEmployeeService } from "../services/EmployeeService"  
import { useNavigate } from "react-router-dom"  

const EmpCompList = () => {
    const [employees, setEmployees] = useState([])
    const [loading, setLoading] = useState(true)
    const navigator = useNavigate();
    
    // Function to get all employees (without setting loading state)
    function getAllEmployees() {
        listEmployees()
            .then((response) => {
                setEmployees(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }
    
    // Initial load with loading state
    useEffect(() => {
        listEmployees()
            .then((response) => {
                setEmployees(response.data)
                setLoading(false)
            })
            .catch((error) => {
                console.log(error)
                setLoading(false)
            })
    }, [])  
    
    function addNewEmployee() {
        navigator('/add-employee')
    }
    
    function updateEmployee(id) {
        navigator(`/edit-employee/${id}`)
    }
    
    function deleteEmployee(id, employeeName) {
        // Confirmation dialog before deleting
        const confirmDelete = window.confirm(
            `Are you sure you want to delete ${employeeName}?`
        )
        
        if (!confirmDelete) {
            return
        }
        
        deleteEmployeeService(id)
            .then((response) => {
                console.log('Employee deleted successfully:', response.data)
                // Refresh the employee list after deletion
                getAllEmployees()
            })
            .catch((error) => {
                console.error('Error deleting employee:', error)
                alert('Failed to delete employee. Please try again.')
            })
    }
    
    if (loading) {
        return (
            <div className='container text-center mt-5'>
                <p>Loading employees...</p>
            </div>
        )
    }
    
    return (
        <div className='container'> 
            <h2 className='text-center'>Employee List</h2>
            
            <div className="d-flex justify-content-between mb-2">
                <button className='btn btn-primary' onClick={addNewEmployee}>
                    Add Employee
                </button>
                <button className='btn btn-secondary' onClick={getAllEmployees}>
                    Refresh
                </button>
            </div>
            
            {employees.length === 0 ? (
                <div className="alert alert-info text-center">
                    No employees found. Click "Add Employee" to create one.
                </div>
            ) : (
                <table className='table table-striped table-bordered'>
                    <thead className='text-center'>
                        <tr>
                            <th>Employee Id</th>
                            <th>Employee First Name</th>
                            <th>Employee Last Name</th>
                            <th>Employee Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((emp) => (
                            <tr key={emp.id}>
                                <td>{emp.id}</td>
                                <td>{emp.firstName}</td>
                                <td>{emp.lastName}</td>
                                <td>{emp.email}</td>
                                <td>
                                    <button 
                                        className='btn btn-info me-2' 
                                        onClick={() => updateEmployee(emp.id)}
                                    >
                                        Update
                                    </button>
                                    <button 
                                        className='btn btn-danger' 
                                        onClick={() => deleteEmployee(
                                            emp.id, 
                                            `${emp.firstName} ${emp.lastName}`
                                        )}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default EmpCompList