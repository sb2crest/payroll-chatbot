import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ChatbotComponent from './ChatbotComponent';
import styled from 'styled-components';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  overflow-x: hidden;
  background-color: #f4f4f9;
  text-align: center;
  font-family: 'Arial', sans-serif;
  -ms-overflow-style: none;
`;

const Header = styled.header`
  width: 100%;
  background-color: #007bff;
  color: white;
  padding: 1rem;
  position: fixed;
  top: 0;
  left: 0;
  text-align: center;
`;

const MainContent = styled.main`
  margin-top: 3rem; /* To account for the fixed header */
  padding: 2rem;
  width: 100%;
`;

const Title = styled.h1`
  margin-bottom: 2rem;
`;

const LogoutButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c82333;
  }
`;

const ManagerHome = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userType = location.state?.userType || 'Unknown';

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <HomeContainer>
      <Header>
        <h1>Welcome to My App</h1>
      </Header>
      <MainContent>
        <Title>{userType === 'Manager' ? 'Manager Page' : 'User Page'}</Title>
        <ChatbotComponent userType={userType} />
        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      </MainContent>
    </HomeContainer>
  );
};

export default ManagerHome;
