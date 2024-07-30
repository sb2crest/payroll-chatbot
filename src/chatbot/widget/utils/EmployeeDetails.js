import React from 'react';
import DatePickers from './DatePickers';
import './styles.css';

const EmployeeDetails = ({ employee, newWorkingHours, handleDateChange, handleWorkingHoursChange, handleUpdateWorkingHours }) => {
  return (
    <div className="result">
      <h3>Employee Details</h3>
      <div className="detailsContainer">
        <div className="labels">
          <p className="label"><strong>Name</strong></p>
          <p className="label"><strong>Email</strong></p>
          <p className="label"><strong>Phone No.</strong></p>
          <p className="label"><strong>Pay Sched</strong></p>
          <p className="label"><strong>Pay Rate</strong></p>
        </div>
        <div className="data">
          <p className="label">: {employee.firstName} {employee.lastName}</p>
          <p className="label">: {employee.email}</p>
          <p className="label">: {employee.phoneNumber}</p>
          <p className="label">: {employee.paySchedule}</p>
          <p className="label">: {employee.payRate}</p>
        </div>
      </div>
      <DatePickers
        newWorkingHours={newWorkingHours}
        handleDateChange={handleDateChange}
      />
      <input
        type="number"
        name="dailyCompanyWorkingHours"
        value={newWorkingHours.dailyCompanyWorkingHours}
        onChange={handleWorkingHoursChange}
        placeholder="Enter Daily Company Working Hours"
        className="input"
      />
      <button onClick={handleUpdateWorkingHours} className="button">Update Working Hours</button>
    </div>
  );
};

export default EmployeeDetails;
