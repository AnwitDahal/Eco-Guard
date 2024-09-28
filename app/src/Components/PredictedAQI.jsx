import React from "react";
import { predictedData } from "../Data";

const PredictedAQI = () => {
  return (
    <section className="pl-96">
      <div className="">
        <h1>Weather for next 7 days</h1>
      </div>
      <div className="flex ">
        {predictedData.map((value, index) => (
          <div key={value} className="flex flex-col bg-[#D9D9D9] h-44 rounded-[1.875rem] w-32 mx-2 justify-between">
            <h1 className="text-center">{value.day}</h1>
            <p className="text-center">{value.aqi}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PredictedAQI;
