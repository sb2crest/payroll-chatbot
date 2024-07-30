import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SignupForm.css'; // Import CSS file for styling

const SignupForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [formValid, setFormValid] = useState(false);
    const[emailInUse,setEmailInUse]=useState(false);

    useEffect(() => {
        checkFormValidity();
    }, [formData, errors]);

    const handleChange = async (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (name === 'firstName') {
            validateFirstName(value);
        } else if (name === 'lastName') {
            validateLastName(value);
        } else if (name === 'username') {
            validateUsername(value);
            await checkUsernameExists(value);
        } else if (name === 'email') {
            validateEmail(value);
            await checkEmailExists(value);
        } else if (name === 'password') {
            validatePassword(value);
        } else if (name === 'confirmPassword') {
            validateConfirmPassword(formData.password, value);
        }
    };

    const validateFirstName = (firstName) => {
        const isValid = firstName.length > 0;
        setErrors((prevErrors) => ({
            ...prevErrors,
            firstName: isValid ? '' : 'First name is required'
        }));
    };

    const validateLastName = (lastName) => {
        const isValid = lastName.length > 0;
        setErrors((prevErrors) => ({
            ...prevErrors,
            lastName: isValid ? '' : 'Last name is required'
        }));
    };

    const validateUsername = (username) => {
        const isValid = username.length >= 3;
        setErrors((prevErrors) => ({
            ...prevErrors,
            username: isValid ? '' : 'Username must be at least 3 characters long'
        }));
    };

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = regex.test(email);
        setErrors((prevErrors) => ({
            ...prevErrors,
            email: isValid ? '' : 'Invalid email address'
        }));
    };

    const validatePassword = (password) => {
        const isValid = password.length >= 6;
        setErrors((prevErrors) => ({
            ...prevErrors,
            password: isValid ? '' : 'Password must be at least 6 characters long'
        }));
    };

    const validateConfirmPassword = (password, confirmPassword) => {
        const isValid = password === confirmPassword;
        setErrors((prevErrors) => ({
            ...prevErrors,
            confirmPassword: isValid ? '' : 'Passwords do not match'
        }));
    };

    const checkFormValidity = () => {
        const isFormValid =
            formData.firstName &&
            formData.lastName &&
            formData.username &&
            formData.email &&
            formData.password &&
            formData.confirmPassword &&
            Object.values(errors).every((error) => error === '');
        setFormValid(isFormValid);
    };

    const checkEmailExists = async (email) => {
        try {
            const response = await axios.post(`http://localhost:8080/api/users/emailExists/${email}`);
            console.log(response.data);
            if (response.data) {
                setEmailInUse(true);
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    email: 'Email already in use'
                }));
            }else{
                setEmailInUse(false);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const checkUsernameExists = async (username) => {
        try {
            const response = await axios.post(`http://localhost:8080/api/users/usernameExists/${username}`);
            console.log(response.data);
            if (response.data) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    username: 'Username already in use'
                }));
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formValid) {
            try {
                const response = await axios.post('http://localhost:8080/api/users/signup', formData);
                console.log(response.data); // Handle success (e.g., redirect)
            } catch (error) {
                if (error.response && error.response.data) {
                    console.error(error.response.data);
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        email: error.response.data.error
                    }));
                } else {
                    console.error(error);
                    // Handle unexpected error scenario
                }
            }
        }
    };

    return (
        <div className="signup-form-container">
            <h2>User Signup</h2>
            <form onSubmit={handleSubmit} className="signup-form">
                <div className="form-group">
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                        placeholder="Enter your first name"
                        required
                    />
                    {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                        placeholder="Enter your last name"
                        required
                    />
                    {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                        placeholder="Enter your username"
                        required
                    />
                    {errors.username && <div className="invalid-feedback">{errors.username}</div>}
                </div>
                <div className="form-group">
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={() => validateEmail(formData.email)}
                        className={`form-control ${errors.email || emailInUse ? 'is-invalid' : ''}`}
                        placeholder="Enter your email"
                        required
                        // disabled={emailInUse}
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                        placeholder="Enter your password"
                        required
                    />
                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        onBlur={() => validateConfirmPassword(formData.password, formData.confirmPassword)}
                        className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                        placeholder="Confirm your password"
                        required
                    />
                    {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
                </div>
                <button type="submit" className="submit-button" disabled={!formValid}>
                    Signup
                </button>
            </form>
        </div>
    );
};

export default SignupForm;
