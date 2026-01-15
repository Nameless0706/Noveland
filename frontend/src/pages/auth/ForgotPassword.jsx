import React from "react";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

import InputFieldset from "../../components/common/InputField.jsx";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../api/client/authApi.js";
import { toast } from "react-toastify";
import { useFormValidation } from "../../hooks/useFormValidation.js";

function ForgotPassword() {
  const { formValues, formErrors, touched, handleChange, handleBlur } =
    useFormValidation({
      email: "",
    });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await register(formValues.email);
      console.log(data);
      if (data) {
        toast.success("Register successfully");
      }
    } catch (error) {
      console.error(error);
      toast.error("Send OTP failed");
    }
  };

  return (
    <div className="flex justify-center items-center bg-[url('/src/assets/bg.jpg')] bg-cover min-h-screen text-[#5A4B9C] overflow-hidden">
      <div className="w-[450px] -mt-4 backdrop-blur-[5px] rounded-[20px] shadow-[0_0_10px_rgba(0,0,0,0.2)] px-10 py-5">
        <h1 className="font-bold text-center text-3xl">Forgot Password</h1>

        <form onSubmit={handleSubmit}>
            <InputFieldset
              name="email"
              type="email"
              helperText= "Email must contains a single @"
              value={formValues.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={formErrors.email}
              touched={touched.email}
              icon={faEnvelope}
              label="Email"
              placeholder="example@gmail.com"
              isLast={true}
            />

          <div className="flex justify-center">
            <button
              type="submit"
              className=" w-full mt-2 font-semibold justify-center items-center backdrop-blur-lg rounded-lg p-2.5 shadow-[0_0_10px_rgba(0,0,0,0.2)] hover:shadow-[0_0_10px_rgba(0,0,0,0.4)] cursor-pointer text-[#624080]"
            >
              Confirm
            </button>
          </div>

          <div className="flex justify-center mt-4 text-sm">
            <p>
              <Link to="/login" className="hover:underline font-semibold">
                Back to login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
export default ForgotPassword;
