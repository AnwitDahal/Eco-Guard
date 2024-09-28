import React from "react";
import Input from "../Components/Input";

const Alert = () => {
  return (
    <section className="flex justify-center items-center">
      <div className="bg-[hsl(201,16%,62%)] bg-opacity-20 shadow-2xl flex-col  rounded-[1.875rem] py-8 px-5 flex gap-6 w-[35rem] ">
        <div className="">
          <h1 className="text-center font-semibold text-3xl text-white">
            Manage Alerts
          </h1>
        </div>
        <form className="flex  flex-col gap-6">
          <label htmlFor="" className="relative top-4">Location</label>
          <Input type="text" placeholder="Location: Eg.: Kathmandu" />
          <label htmlFor="AQI Threshold:" className="relative top-4">AQI Threshold</label>
          <Input type="text" placeholder="Address" />
          <label htmlFor="" className="relative top-4">Alert Method:</label>
          <Input type="text" placeholder="AQI Threshold " />
          <button className="bg-[#342753E6] rounded-[1.875rem]  text-center text-white py-4 px-6">
            Set Alert  
          </button> 
        </form>
      </div>
    </section>
  );
};

export default Alert;
