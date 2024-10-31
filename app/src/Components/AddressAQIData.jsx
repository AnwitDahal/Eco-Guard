import {
  AudioLines,
  Droplet,
  Thermometer,
  Waves,
  WindIcon,
} from "lucide-react";
import { weatherData } from "../Data";
import { useAuthStore } from "../store/AppStore";
import PredictedAQI from "./PredictedAQI";
import Recommendation from "./Recommendation";

// Health recommendation function
const getHealthRecommendation = (aqi) => {
  if (aqi <= 50) {
    return {
      recommendation: "Air quality is good. It's safe to be outdoors.",
      level: "Good",
    };
  } else if (aqi <= 100) {
    return {
      recommendation:
        "Air quality is moderate. Sensitive individuals should reduce prolonged outdoor exertion.",
      level: "Moderate",
    };
  } else if (aqi <= 150) {
    return {
      recommendation:
        "Unhealthy for sensitive groups. People with respiratory issues should limit outdoor activities.",
      level: "Unhealthy for Sensitive Groups",
    };
  } else if (aqi <= 200) {
    return {
      recommendation:
        "Unhealthy. Everyone may begin to experience adverse health effects; sensitive individuals may experience more serious effects.",
      level: "Unhealthy",
    };
  } else if (aqi <= 300) {
    return {
      recommendation:
        "Very unhealthy. Health alert: everyone may experience more serious health effects.",
      level: "Very Unhealthy",
    };
  } else {
    return {
      recommendation:
        "Hazardous. Health warnings of emergency conditions. Everyone should avoid outdoor exposure.",
      level: "Hazardous",
    };
  }
};

const AddressAQIData = () => {
  const { user, updateData, aqiData } = useAuthStore();

  // Get health recommendation based on AQI
  const healthInfo = getHealthRecommendation(aqiData.overall_aqi);

  return (
    <section className="grid grid-cols-1 gap-6 p-5 min-h-screen relative -top-20">
      <div className="my-14 font-normal">
        <p className="text-center text-3xl text-white font-bold">
          Welcome Back  <br />
           <span className="font-bold">{user.name}</span>
        </p>
        <div className="flex justify-end">
          <button onClick={updateData} className="bg-blue-800 rounded-lg p-4 text-white relative -top-10">
            Update now
          </button>
        </div>
      </div>

      {/* Use a grid for the weather data */}
      <div className="flex flex-col ">
        <div className="flex flex-row mb-2">
          <div className="shadow-custom bg-yellow-500 mr-2 flex flex-col col-span-2 flex-wrap gap-5 p-5 rounded-[1.875rem] text-white h-52 w-[100rem]">
            <div className="flex ">
              <AudioLines className="mb-2" size={45} color="white" />
              <h1 className="text-xl font-bold pl-5">Air Quality Index (AQI)</h1>
            </div>
            <div className="flex flex-col">
            <p className="text-4xl">{aqiData.overall_aqi}</p>
            <p>{healthInfo.recommendation}</p>
            </div>
              
          </div>
          <div className="shadow-custom bg-sky-600 flex flex-col col-span-2 flex-wrap gap-5 p-5 rounded-[1.875rem] text-white h-52 w-[100rem]">
            {" "}
            <div className="flex">
              <Waves className="mb-2" size={30} color="white" />
              <h1 className="text-xl font-bold pl-5">PM 2.5</h1>
            </div>
            <h1 className="text-4xl">{aqiData.PM2_5.aqi}</h1>
            <p>Good</p>
          </div>
        </div>

        <div className="flex flex-row justify-evenly">
          <div className="shadow-custom bg-sky-600 flex flex-col gap-5 w-72  p-5 rounded-[1.875rem] text-white h-48">
            <div className="flex">
              <WindIcon className="mb-2" size={40} color="white" />
              <h1 className="text-xl font-bold pl-5">Wind</h1>
            </div>
            <h1 className="text-2xl">40 km/h</h1>
            <p>Tree leaves shake incessantly.</p>
          </div>
          <div className="shadow-custom  bg-sky-600 flex flex-col gap-5 p-5 w-72 rounded-[1.875rem] text-white h-48">
            <div className="flex">
              <Thermometer className="mb-2" size={40} color="white" />
              <h1 className="text-xl font-bold pl-5">Temperature</h1>
            </div>
            <h1 className="text-2xl">18⁰C</h1>
            <p>Feels like 17⁰.</p>
          </div>
          <div className="shadow-custom flex  bg-sky-600 flex-col gap-5 p-5 w-72 rounded-[1.875rem] text-white h-48">
            <div className="flex">
              <Droplet className="mb-2" size={40} color="white" />
              <h1 className="text-xl font-bold pl-5">Humidity</h1>
            </div>
            <h1 className="text-xl">71%</h1>
            <p>Wetter Environment</p>
          </div>
        </div>
      </div>

      <PredictedAQI />

      <div className="bg-[#D9D9D9] py-6 px-24 h-36 rounded-3xl flex justify-center items-censtartter flex-col">
        <h1 className="font-medium text-2xl">Health Recommendation</h1>
        <div>
          <p>{healthInfo.recommendation}</p>
        </div>
      </div>

    </section>
  );
};

export default AddressAQIData;
