import React, { useEffect } from "react";

import InputFieldset from "../../components/common/InputField.jsx";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { register } from "../../api/authApi.js";
import { toast } from "react-toastify";

function VerifyOtp() {
  const location = useLocation();
  const navigate = useNavigate();

  // Only user from register can access this verify link


  // useEffect(() => {
  //   if (!location.state?.from) {
  //     navigate("/login");
  //   }
  // }); 



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await register();
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


          
          
          <div className="border h-20 w-10"></div>


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
export default VerifyOtp;
