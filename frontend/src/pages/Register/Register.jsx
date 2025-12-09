import React, { useState } from "react";
import { faUser, faLock, faEnvelope } from "@fortawesome/free-solid-svg-icons";

import InputFieldset from "../../components/common/InputField.jsx";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  //State to manage form values
  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      label: "Username",
      placeholder: "Jane Doe",
      icon: faUser,
      helperText:
        "Username should be at least 5-16 characters and not contains special characters.",
      pattern: "^[A-Za-z0-9]{5,16}$",
    },

    {
      id: 2,
      name: "email",
      type: "email",
      label: "Email",
      placeholder: "example@gmail.com",
      icon: faEnvelope,
      helperText: "Email must contains a single @",
    },

    {
      id: 3,
      name: "password",
      type: "password",
      label: "Password",
      placeholder: "************",
      togglePassword: true,
      showPassword: { showPassword },
      helperText:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
    },

    {
      id: 4,
      name: "confirmPassword",
      type: "password",
      label: "Confirm Password",
      placeholder: "************",
      togglePassword: true,
      icon: faLock,
      helperText: "Passwords don't match, please check again.",
      pattern: formValues.password,
    },
  ];

  const validateField = (e) => {
    const { name, value } = e.target;
    // Validation logic
    setFormErrors((prev) => {
      const updated = { ...prev };

      if (name === "confirmPassword") {
        updated.confirmPassword = value !== formValues.password;
      } else if (name === "email") {
        updated.email = !e.target.checkValidity();
      } else if (e.target.pattern) {
        const regex = new RegExp(e.target.pattern);
        updated[name] = !regex.test(value); // invalid if pattern fails
      }

      return updated;
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    validateField(e);
  };


  const handleBlur = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(e);
  };

  const handleFocus = (e) => {
    const { name } = e.target;
    setFormErrors((prev) => ({ ...prev, [name]: false }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formValues);
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center bg-[url('/src/assets/bg.jpg')] bg-cover min-h-screen text-[#5A4B9C] overflow-hidden">
      <div className="w-[450px] -mt-4 backdrop-blur-[5px] rounded-[20px] shadow-[0_0_10px_rgba(0,0,0,0.2)] px-10 py-5">
        <h1 className="font-bold text-center text-4xl">Register</h1>

        <form onSubmit={handleSubmit}>
          {inputs.map((input) => (
            <InputFieldset
              key={input.id}
              {...input}
              value={formValues[input.name]}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              invalid={formErrors[input.name]}
              touched={touched[input.name]}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            />
          ))}

          <div className="flex justify-center">
            <button
              type="submit"
              className=" w-full mt-2 font-semibold justify-center items-center backdrop-blur-lg rounded-lg p-2.5 shadow-[0_0_10px_rgba(0,0,0,0.2)] hover:shadow-[0_0_10px_rgba(0,0,0,0.4)] cursor-pointer text-[#624080]"
            >
              Register
            </button>
          </div>

          <div className="flex justify-center mt-4 text-sm">
            <p>
              {" "}
              Already a member?{" "}
              <Link to="/login" className="hover:underline font-semibold">
                Login now
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Register;
