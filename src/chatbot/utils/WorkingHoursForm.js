import React, { useState, useEffect } from 'react';
import DatePickers from './DatePickers';
import axios from 'axios';
import './styles.css';

const WorkingHoursForm = ({ employee, initialWorkingHours, onUpdate, actionProvider, onClose }) => {
  // Utility function to format date to "YYYY-MM-DD"
  const formatDateToString = (date) => {
    if (isNaN(date.getTime())) {
      console.error("Invalid date:", date);
      return ""; // Handle as appropriate
    }
    return new Date(date).toISOString().split('T')[0];
  };

  // Get the Monday of the current week
  const getMondayOfCurrentWeek = () => {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 (Sunday) to 6 (Saturday)
    const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    const monday = new Date(today);
    monday.setDate(today.getDate() + diffToMonday);
    return formatDateToString(monday);
  };

  // Calculate the end date based on the schedule
  const calculateEndDate = (startDate, paySchedule, workingDays) => {
    const startDateObj = new Date(startDate);
    if (isNaN(startDateObj.getTime())) {
      console.error("Invalid startDate:", startDate);
      return ""; // Handle as appropriate
    }

    let endDate = new Date(startDateObj);
    
    if (paySchedule === 'WEEKLY') {
      endDate.setDate(endDate.getDate() + (workingDays-1 || 6));
    } else if (paySchedule === 'BI_WEEKLY') {
      endDate.setDate(endDate.getDate() + 13);
    }

    return formatDateToString(endDate);
  };

  // Initialize state
  const [workingHours, setWorkingHours] = useState({
    ...initialWorkingHours,
    startDate: getMondayOfCurrentWeek(),
    endDate: calculateEndDate(getMondayOfCurrentWeek(), employee.paymentMode, employee.workingDays),
  });

  const [formError, setFormError] = useState("");

  // Update endDate when employee.paymentMode or workingDays change
  useEffect(() => {
    setWorkingHours((prevWorkingHours) => ({
      ...prevWorkingHours,
      endDate: calculateEndDate(prevWorkingHours.startDate, employee.paymentMode, employee.workingDays),
    }));
  }, [employee.paymentMode, employee.workingDays]);

  // Handle date change in internal date pickers
  const handleInternalDateChange = (date, dateType) => {
    const formattedDate = formatDateToString(date);
    const updatedWorkingHours = { ...workingHours, [dateType]: formattedDate };
    if (dateType === 'startDate') {
      updatedWorkingHours.endDate = calculateEndDate(formattedDate, employee.paymentMode, employee.workingDays);
    }
    setWorkingHours(updatedWorkingHours);
  };

  // Handle change in working hours input
  const handleWorkingHoursChange = (e) => {
    setWorkingHours((prevWorkingHours) => ({
      ...prevWorkingHours,
      dailyCompanyWorkingHours: e.target.value,
    }));
  };

  // Validate the form
  const isFormValid = () => {
    return workingHours.startDate && workingHours.endDate && workingHours.dailyCompanyWorkingHours;
  };

  // Update working hours on form submission
  const handleUpdateWorkingHours = async () => {
    if (!isFormValid()) {
      setFormError("Please fill in all required fields.");
      return;
    }
    setFormError("");
    try {
      const response = await axios.post('/api/payrollManager/weekly-report', {
        managerUniqueId: "MUID0001",
        firstName: employee.firstName,
        lastName: employee.lastName,
        startDate: workingHours.startDate,
        endDate: workingHours.endDate,
        defaultWorkingHours: parseFloat(workingHours.dailyCompanyWorkingHours),
      });
      actionProvider.addMessageToState(
        actionProvider.createChatBotMessage(`Submitted Successfully for ${response.data.startDate} to ${response.data.endDate}`)
      );
      onUpdate(workingHours);
      if (onClose) {
        onClose(); 
      }
    } catch (error) {
      let errorMessage = "An unexpected error occurred";
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      } else if (error.response && error.response.data) {
        errorMessage = error.response.data;
      }
      actionProvider.addMessageToState(
        actionProvider.createChatBotMessage(errorMessage)
      );
      console.error('Error updating working hours:', error);
    }
  };

  return (
    <div>
      <DatePickers
        newWorkingHours={workingHours}
        handleDateChange={handleInternalDateChange}
      />
      <input
        type="number"
        name="dailyCompanyWorkingHours"
        value={workingHours.dailyCompanyWorkingHours}
        onChange={handleWorkingHoursChange}
        placeholder="Weekly Working Hrs."
        className="input"
        style={{ backgroundColor: "white", border: "solid 1px black", width: "88%" }}
      />
      {formError && <p className="error-message">{formError}</p>}
      <button onClick={handleUpdateWorkingHours} className="button" disabled={!isFormValid()}>
        Update Working Hours
      </button>
    </div>
  );
};

export default WorkingHoursForm;