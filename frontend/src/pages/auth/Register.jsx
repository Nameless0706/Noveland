import React, { useState } from "react";
import { faUser, faLock, faEnvelope } from "@fortawesome/free-solid-svg-icons";

import InputFieldset from "../../components/common/InputField.jsx";
import { useFormValidation } from "../../hooks/useFormValidation.js";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../api/client/authApi.js";
import { toast } from "react-toastify";

function Register() {
	
  //State to manage form values
  const { formValues, formErrors, touched, handleChange, handleBlur} = useFormValidation({
	display_name: "",
	email: "",
	password: "",
	confirmPassword: "",
});

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const inputs = [
    {
      id: 1,
      name: "display_name",
      type: "text",
      label: "Display Name",
      placeholder: "Jane Doe",
      icon: faUser,
      pattern: "^[A-Za-z0-9 ]{5,16}$",
    },

    {
      id: 2,
      name: "email",
      type: "email",
      label: "Email",
      placeholder: "example@gmail.com",
      icon: faEnvelope,
    },

    {
      id: 3,
      name: "password",
      type: "password",
      label: "Password",
      placeholder: "************",
      togglePassword: true,
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
      pattern: formValues.password,
    },
  ];

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const {display_name, email, password} = {...formValues};
      const data = await register(display_name, email, password);
      console.log(data);
      if (data){
        toast.success("Register successfully");
        navigate("/login");
      }
    }
    catch (error){
      console.error(error);
      toast.error("Register failed");
    }
  };

  return (
    <div className="flex justify-center items-center bg-[url('/src/assets/bg.jpg')] bg-cover min-h-screen text-[#5A4B9C] overflow-hidden">
      <div className="w-[450px] -mt-4 backdrop-blur-[5px] rounded-[20px] shadow-[0_0_10px_rgba(0,0,0,0.2)] px-10 py-5">
        <h1 className="font-bold text-center text-4xl">Register</h1>

        <form onSubmit={handleSubmit}>
          {inputs.map((input, index) => (
            <InputFieldset
              key={input.id}
              {...input}
              value={formValues[input.name] || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              error={formErrors[input.name]}
              touched={touched[input.name]}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              isLast={index === inputs.length - 1}
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
