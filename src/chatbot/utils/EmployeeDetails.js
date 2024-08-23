import React, { useState } from 'react';
import WorkingHoursForm from './WorkingHoursForm';
import './styles.css';

const EmployeeDetails = ({ employee, newWorkingHours, handleUpdateWorkingHours, actionProvider }) => {
  const [showForm, setShowForm] = useState(false);

  const handleFormUpdate = (updatedWorkingHours) => {
    if (handleUpdateWorkingHours) {
      handleUpdateWorkingHours(updatedWorkingHours);
    } else {
      console.error('handleUpdateWorkingHours is not defined');
    }
    setShowForm(false);
  };

  const handleShowFormToggle = () => {
    setShowForm(prevShowForm => !prevShowForm);
  };

  return (
    <div className="result">
      <h3>Employee Details</h3>
      <div className="detailsContainer">
        <div className="labels" style={{marginLeft:'14px'}}>
          <p className="label"><strong>Name</strong></p>
          <p className="label"><strong>Work Hrs.</strong></p>
          <p className="label"><strong>Pay Sched</strong></p>
          <p className="label"><strong>Work Days</strong></p>
        </div>
        <div className="data">
          <p className="label">: {employee.firstName} {employee.lastName}</p>
          <p className="label">: {employee.assignedDefaultHours}</p>
          <p className="label">: {employee.paymentMode}</p>
          <p className="label">: {employee.workingDays}</p>
        </div>
      </div>
      <button onClick={handleShowFormToggle} className="button">
        {showForm ? 'Hide Working Hours' : 'Show Working Hours'}
      </button>
      {showForm && (
        <WorkingHoursForm
          employee={employee}
          initialWorkingHours={newWorkingHours}
          onUpdate={handleFormUpdate}
          actionProvider={actionProvider}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

export default EmployeeDetails;
