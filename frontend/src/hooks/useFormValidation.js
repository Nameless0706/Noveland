import { useState } from "react";

export const useFormValidation = (initialValues) => {
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validate = (name, value, values, pattern, type) => {
    // Email
    if (type === "email") {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
        return "Invalid email format";
    }

    // Confirm password
    if (name === "confirmPassword") {
      if (value !== values.password) return "Passwords do not match";
    }

    // Pattern-based validation
    if (pattern && !new RegExp(pattern).test(value)) {
  
      switch (name){
        case "display_name": return "Display name should be at least 5-16 characters and not contains special characters."
        case "password": return "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character"
      }
      
    }

    return null;
  };

  const handleChange = (e) => {
    const { name, value, pattern, type } = e.target;

    setFormValues((prev) => {
      const updated = { ...prev, [name]: value };

      setFormErrors((prevErr) => ({
        ...prevErr,
        [name]: validate(name, value, updated, pattern, type),
      }));

      return updated;
    });
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  return {
    formValues,
    formErrors,
    touched,
    handleChange,
    handleBlur,
  };
};
