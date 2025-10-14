import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";

import InputFieldset from "../../components/common/InputField.jsx";

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

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      label: "Username",
      placeholder: "Username",
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
      placeholder: "Email",
      helperText: "Email must be a valid email address.",
    },

    {
      id: 3,
      name: "password",
      type: "password",
      label: "Password",
      placeholder: "Password",
      icon: faLock,
      helperText:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
    },

    {
      id: 4,
      name: "confirmPassword",
      type: "password",
      label: "Confirm Password",
      placeholder: "Confirm Password",
      helperText: "Passwords don't match, please check again.",
      pattern: formValues.password,
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));

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

  console.log(formErrors);

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formValues);
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
              onBlur={handleBlur}
              invalid={formErrors[input.name]}
              touched={touched[input.name]}
            />
          ))}

          <div className="flex justify-center">
            <button
              type="submit"
              className=" w-full mt-2 font-semibold justify-center items-center backdrop-blur-lg rounded-lg p-2.5 shadow-[0_0_10px_rgba(0,0,0,0.2)] cursor-pointer text-[#624080]"
            >
              Register
            </button>
          </div>

          <div className="flex justify-center mt-4 text-sm">
            <p> Already a member?  <a href="/login" className="hover:underline font-semibold">Login now</a></p>  
          </div>

         
           
        

        </form>

      </div>

    </div>
  );
}
export default Register;
