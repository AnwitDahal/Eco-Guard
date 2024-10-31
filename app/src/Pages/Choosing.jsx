import React from "react";
import { MoveRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Choosing = () => {
  const navigate = useNavigate();
  return (
    <section className="bg-bluish-radial-gradient from-[#087EB8] to-[#71BCE1]  min-h-screen flex justify-center items-center flex-col ">
      <button
        className="bg-[hsl(200,51%,85%)] bg-opacity-20 shadow-2xl rounded-[1.875rem] flex gap-6 w-[35rem] justify-center items-center py-5"
        onClick={() => navigate("/signuporg")}
      >
        Sign Up as Organization <MoveRight size={24} color="black" />
      </button>
      <button
        className="bg-[hsl(200,51%,85%)] bg-opacity-20 shadow-2xl rounded-[1.875rem] flex gap-6 w-[35rem] justify-center items-center py-5 mt-5" 
        onClick={() => navigate("/signupindie")}
      >Sign up as Individual <MoveRight size={24} color="black" /></button>
    </section>
  );
};

export default Choosing;
