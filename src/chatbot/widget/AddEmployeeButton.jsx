import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CustomSelect from '../utils/CustomSelect';
import '../utils/styles.css';

const AddEmployeeButton = (props) => {
  const { actionProvider } = props;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    sinNumber: "",
    role: "",
    paySchedule: "",
    payRate: "",
    employeeUniqueId: 13,
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    sinNumber: "",
    role: "",
    paySchedule: "",
    payRate: "",
  });

  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    checkFormValidity();
  }, [formData, errors]);

  const handleChange = (name, value) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "firstName":
        error = value ? "" : "First name is required";
        break;
      case "lastName":
        error = value ? "" : "Last name is required";
        break;
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        error = emailRegex.test(value) ? "" : "Invalid email address";
        break;
      case "phoneNumber":
        error = value ? "" : "Phone number is required";
        break;
      case "sinNumber":
        error = value ? "" : "SIN number is required";
        break;
      case "role":
        error = value ? "" : "Role is required";
        break;
      case "paySchedule":
        error = value ? "" : "Pay Schedule is required";
        break;
      case "payRate":
        error = value ? "" : "Pay Rate is required";
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const checkFormValidity = () => {
    const isValid =
      Object.values(errors).every((error) => error === "") &&
      Object.values(formData).every((value) => value !== "");
    setFormValid(isValid);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formValid) {
      try {
        const response = await axios.post(
          `/api/payrollManager/manager/MGR4/addEmployee`,
          formData
        );
        const message = `'${response.data.firstName} ${response.data.lastName}' added successfully.`;

        actionProvider.handleAfterSuccess(message);
        console.log(message);
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || "Failed to add employee.";
        actionProvider.addMessageToState(
          actionProvider.createChatBotMessage(errorMessage)
        );
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="formGroup">
        <label className="nameLabel">Name:</label>
        <div className="nameFields" style={{ display: "flex" }}>
          <div className="formGroup">
            <input
              type="text"
              name="firstName"
              placeholder="First"
              value={formData.firstName}
              onChange={(e) => handleChange('firstName', e.target.value)}
              className={`input ${errors.firstName ? "is-invalid" : ""}`}
              required
            />
            {errors.firstName && (
              <div className="error">{errors.firstName}</div>
            )}
          </div>
          <div className="formGroup">
            <input
              type="text"
              name="lastName"
              placeholder="Last"
              value={formData.lastName}
              onChange={(e) => handleChange('lastName', e.target.value)}
              className={`input ${errors.lastName ? "is-invalid" : ""}`}
              required
            />
            {errors.lastName && <div className="error">{errors.lastName}</div>}
          </div>
        </div>
      </div>
      <div className="formGroup">
        <label className="label">Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          className={`input ${errors.email ? "is-invalid" : ""}`}
          required
        />
        {errors.email && <div className="error">{errors.email}</div>}
      </div>
      <div className="formGroup">
        <label className="label">Phone Number:</label>
        <input
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={(e) => handleChange('phoneNumber', e.target.value)}
          className={`input ${errors.phoneNumber ? "is-invalid" : ""}`}
          required
        />
        {errors.phoneNumber && (
          <div className="error">{errors.phoneNumber}</div>
        )}
      </div>
      <div className="formGroup">
        <label className="label">SIN Number:</label>
        <input
          type="text"
          name="sinNumber"
          value={formData.sinNumber}
          onChange={(e) => handleChange('sinNumber', e.target.value)}
          className={`input ${errors.sinNumber ? "is-invalid" : ""}`}
          required
        />
        {errors.sinNumber && <div className="error">{errors.sinNumber}</div>}
      </div>
      <div className="formGroup">
        <label className="label">Role:</label>
        <input
          type="text"
          name="role"
          value={formData.role}
          onChange={(e) => handleChange('role', e.target.value)}
          className={`input ${errors.role ? "is-invalid" : ""}`}
          required
        />
        {errors.role && <div className="error">{errors.role}</div>}
      </div>
      <div className="formGroup">
        <label className="label">Pay Schedule:</label>
        <CustomSelect
          options={["WEEKLY", "BI_WEEKLY", "MONTHLY"]}
          value={formData.paySchedule}
          onChange={(value) => handleChange('paySchedule', value)}
          placeholder="Select Pay Schedule"
        />
        {errors.paySchedule && (
          <div className="error">{errors.paySchedule}</div>
        )}
      </div>
      <div className="formGroup">
        <label className="label">Pay Rate:</label>
        <CustomSelect
          options={["HOURLY", "DAILY"]}
          value={formData.payRate}
          onChange={(value) => handleChange('payRate', value)}
          placeholder="Select Pay Rate"
        />
        {errors.payRate && <div className="error">{errors.payRate}</div>}
      </div>
      <button type="submit" className="button" disabled={!formValid}>
        Add Employee
      </button>
    </form>
  );
};

export default AddEmployeeButton;
