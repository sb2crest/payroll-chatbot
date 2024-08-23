import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled, { keyframes } from 'styled-components';

const backgroundAnimation = keyframes`
  0% { background-position: 0% 25%; }
  25% { background-position: 25% 50%; }
  50% { background-position: 50% 75%; }
  75% { background-position: 75% 100%; }
  100% { background-position: 100% 0%; }
`;

const LoginPage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(270deg, #ff9a9e, #f6d0c1, #d8cfc4, #f0a3a2, #ff9a9e, #f4c4e0);
  background-size: 600% 600%;
  animation: ${backgroundAnimation} 20s ease infinite;
`;

const FormContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(255, 255, 255, 0.8);
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 350px;
  text-align: center;
  backdrop-filter: blur(10px);
`;

const Title = styled.h2`
  margin-bottom: 2rem;
  color: #333;
`;

const Input = styled.input`
  width: calc(100% - 2rem);
  padding: 0.75rem;
  margin-bottom: 1.5rem;
  border: 1px solid #ccc;
  border-radius: 25px;
  padding-left: 15px;
  font-size: 1rem;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  
  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
    outline: none;
  }
`;

const Button = styled.button`
  width: calc(100% - 2rem);
  padding: 0.75rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: 1rem;
`;

const formVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const ManagerLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock login logic
    if (username === 'MGR4' && password === 'pass') {
      navigate('/home', { state: { userType: 'Manager' } });
    } else if (username === 'EMP01' && password === 'pass') {
      navigate('/home', { state: { userType: 'User' } });
    } else {
      setError('Invalid credentials');
    }    
  };

  return (
    <LoginPage>
      <FormContainer initial="hidden" animate="visible" variants={formVariants}>
        <Title>Login with Creds</Title>
        <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
          <Button type="submit">Login</Button>
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </form>
      </FormContainer>
    </LoginPage>
  );
};

export default ManagerLogin;
