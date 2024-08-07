import React, { useState } from "react";
import axios from "axios";
import EmployeeDetails from "./EmployeeDetails";
import "react-datepicker/dist/react-datepicker.css";
import "./styles.css";
import ActionProvider from "../ActionProvider";
import CustomSelect from "./CustomSelect";

const actionProvider = new ActionProvider();

const EmployeeSearch = ({ searchType, actionProvider }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [searchOption, setSearchOption] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [employeeData, setEmployeeData] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [newWorkingHours, setNewWorkingHours] = useState({
    startDate: null,
    endDate: null,
    employeeWorkHours: {
      dailyCompanyWorkingHours: "8",
    },
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
      employeeWorkHours: {
        ...prev.employeeWorkHours,
        [name]: value,
      },
    }));
  };

  const handleDateChange = (date, name) => {
    setNewWorkingHours((prev) => ({
      ...prev,
      [name]: date ? date.toISOString().split("T")[0] : null,
    }));
  };

  const fetchEmployeeData = async (endpoint, payload) => {
    setLoading(true);
    try {
      const response = await axios.post(endpoint, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const employees = response.data;
      setEmployeeData(employees);
      setError("");
      setUpdateMessage("");

      if (employees.length === 1) {
        setSelectedEmployee(employees[0]); 
      } else {
        setSelectedEmployee(null);
      }
    } catch (err) {
      setError("Error fetching employee data. Please check the search criteria and try again.");
      setEmployeeData([]);
      setSelectedEmployee(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchEmployee = () => {
    const payload = { firstName, lastName };
    if (searchOption && searchValue) {
      payload[optionMappings[searchOption]] = searchValue; 
    }
    fetchEmployeeData("/api/payrollManager/findEmployee", payload);
  };

  const handleGetEmployeeById = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/payrollManager/manager/MGR4/employee/${employeeId}`);
      const employee = response.data;
      setEmployeeData([employee]);
      setError("");
      setUpdateMessage("");
      setSelectedEmployee(employee);
    } catch (err) {
      setError("Error fetching employee data. Please check the ID and try again.");
      setEmployeeData([]);
      setSelectedEmployee(null);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateWorkingHours = async () => {
    try {
      await axios.post("api/payrollManager/manager/addWorkHoursRange", {
        managerUniqueId: "MGR4",
        employeeUniqueId: selectedEmployee.employeeUniqueId,
        startDate: newWorkingHours.startDate,
        endDate: newWorkingHours.endDate,
        employeeWorkHours: {
          dailyCompanyWorkingHours: parseFloat(newWorkingHours.employeeWorkHours.dailyCompanyWorkingHours),
        },
      });
      setUpdateMessage("Working hours updated successfully.");
      setError("");
      setEmployeeData([]);
      setSelectedEmployee(null);
      actionProvider.handleAfterSuccess();
    } catch (err) {
      setError("Error updating working hours. Please try again.");
      setUpdateMessage("");
    }
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
              <input
                type="text"
                value={firstName}
                onChange={handleFirstNameChange}
                placeholder="Enter First Name"
                className="input"
              />
              <input
                type="text"
                value={lastName}
                onChange={handleLastNameChange}
                placeholder="Enter Last Name"
                className="input"
              />
            </div>
            <div className="inputGroup" style={{ marginTop: '6px' }}>
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
                disabled={!searchOption}
              />
            </div>
            <button onClick={handleSearchEmployee} className="button">
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
                  {employee.firstName} {employee.lastName} (ID: {employee.employeeUniqueId})
                </li>
              ))}
            </ul>
          </div>
        )}
        {selectedEmployee && (
          <EmployeeDetails
            employee={selectedEmployee}
            newWorkingHours={newWorkingHours}
            handleDateChange={handleDateChange}
            handleWorkingHoursChange={handleWorkingHoursChange}
            handleUpdateWorkingHours={handleUpdateWorkingHours}
          />
        )}
        {updateMessage && <div className="success">{updateMessage}</div>}
      </div>
    </div>
  );
};

export default EmployeeSearch;
