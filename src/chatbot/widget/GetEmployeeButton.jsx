import React from 'react';
import EmployeeSearch from '../utils/EmployeeSearch';

const GetEmployeeButton = ({ actionProvider, searchType }) => {
  return (
    <EmployeeSearch searchType={searchType} actionProvider={actionProvider} />
  );
};

export default GetEmployeeButton;
