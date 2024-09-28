import React from "react";

import { Link, useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section className="flex bg-[#71BCE1] w-full h-[33rem]">
      <div className="my-[7.5rem] mx-[9.5rem] flex flex-col justify-center items-center">
        <div className="flex justify-center items-center flex-col">
          <p className="text-5xl text-white font-bold text-center mt-4 mx-72">
            {" "}
            Protect Your Health with Real-Time Air Quality Monitoring
          </p>
          <p className="text-center mt-6 mx-[15.5rem] text-[#13062C] font-medium">
            Stay informed, stay safe. Monitor air quality levels in real time
            and receive health recommendations tailored for you.
          </p>
        </div>
        <div className="my-11 gap-4 flex">
          <button className="bg-[#342753E6] text-white py-4 px-6 rounded-lg font-medium"
           onClick={() => navigate("/login")}> Log In</button>
          <button className="bg-transparent border-2 border-white py-4 px-6 rounded-lg font-medium"
          onClick={()=>navigate("/signupindie")}>Sign Up</button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
