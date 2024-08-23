import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './styles.css';

const DatePickers = ({ newWorkingHours, handleDateChange }) => {
  return (
    <div className="date-picker-container">
      <DatePicker
        selected={newWorkingHours.startDate}
        onChange={(date) => handleDateChange(date, 'startDate')}
        dateFormat="yyyy-MM-dd"
        placeholderText="Select Start Date"
        className="custom-datepicker"
      />
      <DatePicker
        selected={newWorkingHours.endDate}
        onChange={(date) => handleDateChange(date, 'endDate')}
        dateFormat="yyyy-MM-dd"
        placeholderText="Select End Date"
        disabled
        className="custom-datepicker"
      />
    </div>
  );
};

export default DatePickers;
