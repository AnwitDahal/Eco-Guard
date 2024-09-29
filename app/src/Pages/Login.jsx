import React, { useState } from "react";
import Input from "../Components/Input";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/AppStore";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { login} = useAuthStore();

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(email, password);
    navigate('/user');
  };

  return (
    <div className="bg-bluish-radial-gradient from-[#71BCE1] to-[#087EB8]  min-h-screen flex justify-center items-center ">
      <div className="bg-[hsl(201,22%,68%)] bg-opacity-20 shadow-2xl  flex-col  rounded-[1.875rem] py-8 px-5 flex gap-6 w-[30rem]">
        <div className="">
          <h1 className="text-center font-semibold text-3xl text-white">
            Welcome Back!
          </h1>
        </div>
        <form className="flex  flex-col gap-6" onSubmit={handleLogin}>
          <Input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="text-center font-medium text-xl">
            Forgot Password?
          </div>
          <button className="bg-[#342753E6] rounded-[1.875rem] text-center text-white py-4 px-6" onClick={handleLogin}>
            Log In
          </button>
        </form>
        <p className=" text-center ">
          Don't have an account?{" "}
          <span
            className="font-semibold cursor-pointer"
            onClick={() => navigate("/choosing")}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
