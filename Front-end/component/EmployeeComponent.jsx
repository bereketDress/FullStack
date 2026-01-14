import React, { useState, useEffect } from 'react'
import { createEmployee, getEmployeeById, updateEmployee } from '../services/EmployeeService'
import { useNavigate, useParams } from 'react-router-dom'  

const EmployeeComponent = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const navigator = useNavigate(); 

    const { id } = useParams();

    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: ''
    }); 
   
    useEffect(() => {
    if (id) {  // Check if id exists
        getEmployeeById(id)  // Call API service
            .then((response) => {
                // Populate form fields with fetched data
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setEmail(response.data.email);
            })
            .catch((error) => {
                console.error('Error fetching employee:', error);
            });
    }
}, [id]);  // Re-run when 'id' changes
   
function handleFirstName(e) {
        setFirstName(e.target.value);
    }

    function handleLastName(e) {
        setLastName(e.target.value);
    }

    function handleEmail(e) {
        setEmail(e.target.value);
    }
    
    function saveOrUpdateEmployee(e) {
        e.preventDefault();
        
        if (validateForm()) {
            const employee = { firstName, lastName, email };
            console.log('Employee data to be saved:', employee);
            
            if (id) {
                // Update existing employee
                updateEmployee(id, employee).then((response) => {
                    console.log('Employee updated successfully:', response.data);
                    navigator('/employees');
                }).catch((error) => {
                    console.error('Error updating employee:', error);
                });
            } else {
                // Create new employee
                createEmployee(employee).then((response) => {
                    console.log('Employee saved successfully:', response.data);
                    navigator('/employees');
                }).catch((error) => {
                    console.error('Error saving employee:', error);
                }); 
            }
        }
    }
    
    function validateForm() {
        let formIsValid = true;
        const errorsCopy = {...errors};

        if (firstName.trim()) {
            errorsCopy.firstName = '';
        } else {
            formIsValid = false;
            errorsCopy.firstName = 'First Name is required';
        }
        if (lastName.trim()) {
            errorsCopy.lastName = '';
        } else {
            formIsValid = false;
            errorsCopy.lastName = 'Last Name is required';
        }   
        if (email.trim()) {
            errorsCopy.email = '';
        } else {
            formIsValid = false;
            errorsCopy.email = 'Email is required';
        }
        setErrors(errorsCopy);
        return formIsValid;
    }

    function pageTitle() {
        if (id) {
            return <h2 className='text-center'>Update Employee</h2>
        } else {
            return <h2 className='text-center'>Add Employee</h2>
        }
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='card col-md-6 offset-md-3'>
                    {pageTitle()}
                    <div className='card-body'>
                        <form>
                            <div className='form-group mb-2'>   
                                <label className='form-label'>First Name:</label>
                                <input 
                                    type='text'
                                    placeholder='Enter First Name'
                                    name='firstName'
                                    className={'form-control' + (errors.firstName ? ' is-invalid' : '')}
                                    value={firstName}
                                    onChange={handleFirstName} 
                                />
                                {errors.firstName && <div className='invalid-feedback'>{errors.firstName}</div>}    
                            </div>

                            <div className='form-group mb-2'>   
                                <label className='form-label'>Last Name:</label>
                                <input 
                                    type='text'
                                    placeholder='Enter Last Name'
                                    name='lastName'
                                    className={'form-control' + (errors.lastName ? ' is-invalid' : '')}
                                    value={lastName}
                                    onChange={handleLastName}  
                                />
                                {errors.lastName && <div className='invalid-feedback'>{errors.lastName}</div>}
                            </div>

                            <div className='form-group mb-2'>   
                                <label className='form-label'>Email:</label>
                                <input 
                                    type='email'
                                    placeholder='Enter Email'
                                    name='email'
                                    className={'form-control' + (errors.email ? ' is-invalid' : '')}
                                    value={email}
                                    onChange={handleEmail}  
                                />
                                {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
                            </div>

                            <button className='btn btn-success' onClick={saveOrUpdateEmployee}>
                                {id ? 'Update' : 'Submit'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>      
        </div>
    )
}

export default EmployeeComponent