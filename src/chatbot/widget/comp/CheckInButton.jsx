import React, { useState } from 'react';
import { Button, Container, Typography, Box } from '@mui/material';

const CheckInOutForm = () => {
  const [checkInTime, setCheckInTime] = useState(null);
  const [checkedIn, setCheckedIn] = useState(false);
  const [message, setMessage] = useState('');
  const [statusVisible, setStatusVisible] = useState(false);

  // Function to format date and time without seconds
  const formatDate = (date) => {
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleCheckIn = () => {
    const now = new Date();
    const formattedDate = formatDate(now);
    setCheckInTime(formattedDate);
    setCheckedIn(true);
    setStatusVisible(true);
    setMessage(`Checked in at ${formattedDate}`);
    console.log(`Checked in at ${formattedDate}`);
  };

  const handleCheckOut = () => {
    const now = new Date();
    const formattedDate = formatDate(now);
    setCheckInTime(formattedDate); // Update checkInTime to show check-out time too
    setCheckedIn(false);
    setStatusVisible(true);
    setMessage(`Checked out at ${formattedDate}`);
    console.log(`Checked out at ${formattedDate}`);
  };

  const handleToggle = () => {
    if (checkedIn) {
      handleCheckOut();
    } else {
      handleCheckIn();
    }
  };

  return (
    <Container component="main" width="100%">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          fontSize: '10px',
          borderRadius: '8px',
          backgroundColor: "rgba(245, 245, 245, 1)",
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          p: 2
        }}
      >
        <Typography sx={{ fontSize: '20px', margin: '8px', textShadow: 'inherit' }} component="h1" variant="h5">
          Check-In/Out
        </Typography>

        {statusVisible && (
          <Box
            sx={{
              backgroundColor: 'white',
              border: '1px solid #ccc',
              borderRadius: '4px',
              padding: '15px',
              marginBottom: '16px',
              width: '80%',
              textAlign: 'center',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
              color: 'text.primary',
            }}
          >
            <Typography variant="body2" sx={{ color: 'text.secondary', textAlign:'center' }}>
              {message}
            </Typography>
          </Box>
        )}

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '80%',
            gap: 2,
            mb: 2
          }}
        >
          <Button
            variant="contained"
            color={checkedIn ? 'secondary' : 'primary'}
            onClick={handleToggle}
            disabled={checkedIn === false && checkInTime !== null}
          >
            {checkedIn ? 'Check Out' : 'Check In'}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default CheckInOutForm;
