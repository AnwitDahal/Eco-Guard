import React from "react";
import { UserDashboardIcons, weatherData } from "../Data";
import PredictedAQI from "./PredictedAQI";
import Recommendation from "./Recommendation";

const AddressAQIData = () => {
  return (
    <section className="grid grid-cols-1 gap-6 p-5 min-h-screen">
      <div className="my-14 font-normal flex justify-between">
        <p className="text-center text-3xl">Welcome Back, John Doe</p>
        <div>
          <button className="bg-red-500 rounded-lg">Update now</button>
          <p>Latest Updated: 7:20 AM</p>
        </div>
      </div>

      {/* Use a grid for the weather data */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {weatherData.map((content, index) => {
          const IconComponent = UserDashboardIcons[content.icon];

          return (
            <div
              key={index}
              className="bg-custom-gray shadow-custom flex flex-col gap-5 p-5 rounded-[1.875rem] text-white h-48"
              
            >
              <div className="flex">
                {IconComponent && (
                  <IconComponent className="mb-2" size={20} color="white" />
                )}
                <h1 className="">{content.title}</h1>
              </div>
              <p className="">{content.value}</p>
              <p>{content.status}</p>
            </div>
          );
        })}
      </div>

      <PredictedAQI />
      <Recommendation />
    </section>
  );
};

export default AddressAQIData;
