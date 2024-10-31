import React from "react";
import { useAuthStore } from "../store/AppStore";

const PredictedAQI = () => {
  const { city } = useAuthStore();

  return (
    <section>
      <div>
        <h1 className="text-[#CFFEF0] font-bold text-xl my-2">
          AQIs for next 7 days
        </h1>
      </div>
      <div className="flex">
        {city.next_week_forecast.map((forecast) => (
          <div
            key={forecast.date}
            className="flex flex-col bg-[#D9D9D9]  mx-2 justify-between rounded-lg size-40 font-bold "
          >
            <h1 className="text-center">{forecast.day}</h1>
            <div className="flex justify-start items-start pl-10">
              <img
                src="../public/Images/uil--forecastcloud-moon-tear.svg"
                alt="rel"
                width={65}
                height={65}
              />
            </div>
            <div className="flex flex-col justify-center items-center">
              <p>{forecast.low_aqi}</p>
              <p>{forecast.high_aqi}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PredictedAQI;
