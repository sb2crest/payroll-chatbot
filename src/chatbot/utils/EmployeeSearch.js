import React, { useState } from "react";
import axios from "axios";
import EmployeeDetails from "./EmployeeDetails";
import "react-datepicker/dist/react-datepicker.css";
import "./styles.css";
import CustomSelect from "./CustomSelect";

const EmployeeSearch = ({ searchType, actionProvider }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [searchOption, setSearchOption] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [employeeData, setEmployeeData] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [newWorkingHours, setNewWorkingHours] = useState({
    managerUniqueId: "",
    startDate: null,
    endDate: null,
    defaultWorkingHours: "",
  });
  const [error, setError] = useState("");
  const [updateMessage, setUpdateMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFirstNameChange = (e) => setFirstName(e.target.value);
  const handleLastNameChange = (e) => setLastName(e.target.value);
  const handleSearchValueChange = (e) => setSearchValue(e.target.value);
  const handleIdChange = (e) => setEmployeeId(e.target.value);

  const handleWorkingHoursChange = (e) => {
    const { name, value } = e.target;
    setNewWorkingHours((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const fetchEmployee = async (url, params) => {
    setLoading(true);
    try {
      const response = await axios.get(url, { params });
      const employees = Array.isArray(response.data)
        ? response.data
        : [response.data];
      setEmployeeData(employees);
      setSelectedEmployee(employees.length === 1 ? employees[0] : null);
      setError("");
    } catch (error) {
      let errorMessage = "Error fetching employee data. Please try again.";
      if (error.response && error.response.data && error.response.data[0].message) {
        errorMessage = error.response.data[0].message;
      }else if(error.response.data)
        errorMessage=error.response.data;
      setError(errorMessage);
      setEmployeeData([]);
      setSelectedEmployee(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchEmployeeByName = async (url, payload) => {
    setLoading(true);
    try {
      const response = await axios.post(url, payload);
      const employees = Array.isArray(response.data)
        ? response.data
        : [response.data];
      setEmployeeData(employees);
      setSelectedEmployee(employees.length === 1 ? employees[0] : null);
      setError("");
    } catch (error) {
      let errorMessage = "Error fetching employee data. Please try again.";
      console.log(error);
      
      // if (error.response && error.response.data && error.response.data[0].message) {
      //   errorMessage = error.response.data[0].message;
      // }else if(error.response.data)
      //   errorMessage=error.response.data;
      setError(errorMessage);
      setEmployeeData([]);
      setSelectedEmployee(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchEmployeeByName = () => {
    const payload = { firstName, lastName };
    if (searchOption && searchValue) {
      payload[optionMappings[searchOption]] = searchValue;
    }
    fetchEmployeeByName("/api/payrollManager/findEmployee", payload);
  };

  const handleGetEmployeeById = () => {
    fetchEmployee("/api/payrollEmployee/findEmployeeById", {
      employeeUniqueId: employeeId,
    });
  };

  const handleSelectEmployee = (employee) => {
    setSelectedEmployee(employee);
  };

  const optionMappings = {
    Email: "email",
    PhoneNumber: "phoneNumber",
    SINNumber: "sinNumber",
  };

  return (
    <div className="container">
      <div className="inputContainer">
        {searchType === "name" && (
          <>
            <div className="inputGroup">
              <div className="nameFields" style={{ display: "flex" }}>
                <input
                  style={{ textAlign: "center" }}
                  type="text"
                  value={firstName}
                  onChange={handleFirstNameChange}
                  placeholder="First Name"
                  className="input"
                />
                <input
                  style={{ textAlign: "center" }}
                  type="text"
                  value={lastName}
                  onChange={handleLastNameChange}
                  placeholder="Last Name"
                  className="input"
                />
              </div>
            </div>
            <div className="inputGroup" style={{ marginTop: "6px" }}>
              <CustomSelect
                options={["Email", "PhoneNumber", "SINNumber"]}
                value={searchOption}
                onChange={setSearchOption}
                placeholder="Select Search Option"
              />
              <input
                type="text"
                value={searchValue}
                onChange={handleSearchValueChange}
                placeholder={`${searchOption}`}
                className="input"
                style={{marginBottom:'4px'}}
                disabled={!searchOption}
              />
            </div>
            <button onClick={handleSearchEmployeeByName} className="button">
              Get Employee
            </button>
          </>
        )}
        {searchType === "id" && (
          <>
            <input
              type="text"
              value={employeeId}
              onChange={handleIdChange}
              placeholder="Enter Employee ID"
              className="input"
              style={{marginBottom:'4px'}}
            />
            <button onClick={handleGetEmployeeById} className="button">
              Get Employee
            </button>
          </>
        )}
        {error && <div className="error">{error}</div>}
        {loading && <div className="loading">Loading...</div>}
      </div>
      <div className="resultContainer">
        {employeeData.length > 0 && !selectedEmployee && (
          <div className="result">
            <h3>Select an Employee</h3>
            <ul style={{ marginLeft: "-18px" }}>
              {employeeData.map((employee) => (
                <li
                  key={employee.employeeUniqueId}
                  onClick={() => handleSelectEmployee(employee)}
                  className="employeeList"
                >
                  {employee.firstName} {employee.lastName} (ID:{" "}
                  {employee.employeeUniqueId})
                </li>
              ))}
            </ul>
          </div>
        )}
        {selectedEmployee && (
          <EmployeeDetails
            employee={selectedEmployee}
            newWorkingHours={newWorkingHours}
            handleWorkingHoursChange={handleWorkingHoursChange}
            setError={setError}
            setUpdateMessage={setUpdateMessage}
            setEmployeeData={setEmployeeData}
            setSelectedEmployee={setSelectedEmployee}
            actionProvider={actionProvider}
          />
        )}
        {updateMessage && <div className="success">{updateMessage}</div>}
      </div>
    </div>
  );
};

export default EmployeeSearch;
