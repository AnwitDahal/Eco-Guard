import React from "react";
import Input from "../Components/Input";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate=useNavigate();
  return (
    <div className="bg-bluish-radial-gradient from-[#71BCE1] to-[#087EB8]  min-h-screen flex justify-center items-center ">
      <div className="bg-[hsl(201,22%,68%)] bg-opacity-20 shadow-2xl  flex-col  rounded-[1.875rem] py-8 px-5 flex gap-6 w-[30rem]">
        <div className="">
          <h1 className="text-center font-semibold text-3xl text-white">
            Welcome Back!
          </h1>
        </div>
        <form className="flex  flex-col gap-6">
          <Input type="email" placeholder="Enter Email" />
          <Input type="password" placeholder="Password" />
          <div className="text-center font-medium text-xl">
            Forgot Password?
          </div>
          <button
            className="bg-[#342753E6] rounded-[1.875rem] text-center text-white py-4 px-6"
          >
            Log In
          </button>
        </form>
        <p className=" text-center ">
          Don't have an account? <span className="font-semibold cursor-pointer" onClick={()=>navigate('/signupindie')}>Sign Up</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
