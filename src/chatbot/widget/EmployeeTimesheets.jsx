// src/EmployeeTimesheets.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../utils/styles.css";

const EmployeeTimesheets = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRange, setSelectedRange] = useState(null); // Currently selected date range
  const [dailyHours, setDailyHours] = useState({}); // Track hours for each date

  useEffect(() => {
    axios
      .get("/api/payrollEmployee/listOfTimeSheets?employeeUniqueId=EUID0003")
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  const generateDateRange = (fromDate, toDate) => {
    const dates = [];
    let currentDate = new Date(fromDate);
    const endDate = new Date(toDate);

    while (currentDate <= endDate) {
      dates.push({
        date: currentDate.toISOString().split('T')[0], // Format YYYY-MM-DD
        dayName: currentDate.toLocaleDateString('en-US', { weekday: 'long' }) // Day name
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  };

  const handleRangeClick = (range) => {
    const dates = generateDateRange(range.fromDate, range.toDate);
    const initialHours = dates.reduce((acc, { date }) => {
      acc[date] = ""; // Initialize with empty string
      return acc;
    }, {});
    setDailyHours(initialHours);
    setSelectedRange(range);
  };

  const handleHourChange = (date, value) => {
    setDailyHours({
      ...dailyHours,
      [date]: value
    });
  };

  const handleSubmit = () => {
    const timeSheetUpdates = Object.entries(dailyHours).map(([date, hours]) => ({
      date,
      hours: hours || "0.0"
    }));

    axios.post('/api/payrollEmployee/updateTimesheet', {
      employeeUniqueId: 'EUID0003',
      timeSheet: timeSheetUpdates
    })
    .then(response => {
      alert('Timesheet submitted successfully');
      setSelectedRange(null); 
    })
    .catch(error => {
      console.error('There was an error submitting the timesheet!', error);
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>No data available</div>;

  return (
    <div style={{padding:'2px',backgroundColor:'rgb(197 222 245)', borderRadius:'6px', boxShadow:'0 2px 4px rgba(0, 0, 0, 0.1)'}}>
      {!selectedRange ? (
        <div style={{backgroundColor:'rgb(197 222 245)', display:'flex', flexDirection:'column'}}>
          <h3 style={{margin:'10px', fontSize:'18px'}}>Select a Date Range</h3>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Date Range</th>
              </tr>
            </thead>
            <tbody>
              {data.timeSheet.map((range) => (
                <tr key={range.timeSheetId}>
                  <td>{range.timeSheetId}</td>
                  <td>
                    <button style={{border:'none', backgroundColor:'inherit',}} onClick={() => handleRangeClick(range)}>
                      {`${range.fromDate} to ${range.toDate}`}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div style={{backgroundColor:'rgb(197 222 245)', borderRadius:'6px', boxShadow:'0 2px 4px rgba(0, 0, 0, 0.1)'}}>
          <h2 style={{marginBottom:'0px', textShadow:'2px 2px 4px rgba(0, 0, 0, 0.5)'}}>Enter Hours</h2>
          <span style={{marginBottom:'5px', textShadow:'2px 2px 4px rgba(0, 0, 0, 0.5)'}}>{`${selectedRange.fromDate} to ${selectedRange.toDate}`}</span>
          
          <table style={{boxShadow:'0 2px 4px rgba(0, 0, 0, 0.1)'}}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Hours</th>
              </tr>
            </thead>
            <tbody>
              {generateDateRange(selectedRange.fromDate, selectedRange.toDate).map(({ date, dayName }) => (
                <tr key={date}>
                  <td className="label">{date} ({dayName})</td>
                  <td>
                    <input
                      type="text"
                      value={dailyHours[date] || ""}
                      onChange={(e) => handleHourChange(date, e.target.value)}
                      min="0"
                      step="0.1"
                      placeholder="Enter Hours"
                      className="input"
                      style={{borderRadius:'4px', width:'80%', outline:'none', textAlign:'center'}}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <h3>Total Hours: {Object.values(dailyHours).reduce((sum, value) => sum + parseFloat(value || 0), 0).toFixed(2)}</h3>
            <button onClick={handleSubmit} className="button">Submit Timesheet</button>
            <button onClick={() => setSelectedRange(null) } className="button">Back to Date Ranges</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeTimesheets;
