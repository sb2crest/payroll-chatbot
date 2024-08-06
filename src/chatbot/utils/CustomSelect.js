import React, { useState, useRef, useEffect } from 'react';
import './styles.css'; // Import the CSS for styling

const CustomSelect = ({ options, value, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value);
  const selectRef = useRef(null);

  const handleSelectClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedValue(option);
    onChange(option);
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (selectRef.current && !selectRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="custom-select" ref={selectRef}>
      <div
        className={`select-selected ${isOpen ? 'select-arrow-active' : ''}`}
        onClick={handleSelectClick}
      >
        {selectedValue || placeholder}
      </div>
      <div className={`select-items ${isOpen ? 'open' : ''}`}>
        {options.map((option, index) => (
          <div
            key={index}
            className={`select-item ${selectedValue === option ? 'same-as-selected' : ''}`}
            onClick={() => handleOptionClick(option)}
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomSelect;
