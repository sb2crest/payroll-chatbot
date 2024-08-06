import { useState, useEffect } from "react";

const useForm = (initialState, validate) => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const allValid = Object.values(errors).every((error) => !error) &&
                     Object.values(formData).every((value) => value);
    setIsValid(allValid);
  }, [formData, errors]);

  const handleChange = (name, value) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: validate(name, value) }));
  };

  return { formData, errors, isValid, handleChange };
};

export default useForm;
