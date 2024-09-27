const { districts } = require("../assests/district");
const axios=require('axios');
const AirQualityModel = require("../model/AirQualityModel");
const DistrictCoordinatesModel = require("../model/DistrictCoordinatesModel");
const WeatherModel = require("../model/WeatherModel");

module.exports.fetchAndStoreAQIData = async () => {
    for (const district of districts) {
      try {
        // Fetch AQI data for the current district
        const response = await axios.get(
          `https://api.api-ninjas.com/v1/airquality?city=${district}`,
          {
            headers: {
              "X-Api-Key": process.env.API_NINJAS_KEY, 
            },
          }
        );
  
        // Structuring the data according to the Mongoose model
        const aqiData = {
          district,
          CO: response.data.CO,
          NO2: response.data.NO2,
          O3: response.data.O3,
          SO2: response.data.SO2,
          PM2_5: response.data["PM2.5"],
          PM10: response.data.PM10,
          overall_aqi: response.data.overall_aqi,
        };
  
        // Save the data to MongoDB
        const newAirQualityModel = new AirQualityModel(aqiData);
        await newAirQualityModel.save();
  
        console.log(`Saved AQI data for ${district}`);
      } catch (error) {
        console.error(
          `Error fetching or saving AQI data for ${district}:`,
          error.message
        );
      }
    }
  };

  module.exports.fetchAndStoreDistrictWeather = async () => {
    try {
      // Get all districts with their coordinates
      const districtsWithCoordinates = await DistrictCoordinatesModel.find();
  
      for (const district of districtsWithCoordinates) {
        const { district: districtName, coordinates } = district;
  
        try {
          // Fetch weather data for the current district using its coordinates
          const response = await axios.get(
            `https://api.api-ninjas.com/v1/weather?lat=${coordinates.latitude}&lon=${coordinates.longitude}`, 
            {
              headers: {
                'X-Api-Key': process.env.API_NINJAS_KEY, // Use your API Ninjas key
              }
            }
          );
  
          // Structure the weather data according to the Mongoose model
          const weatherData = {
            district: districtName,
            latitude: coordinates.latitude,
            longitude: coordinates.longitude,
            cloud_pct: response.data.cloud_pct,
            temp: response.data.temp,
            feels_like: response.data.feels_like,
            humidity: response.data.humidity,
            min_temp: response.data.min_temp,
            max_temp: response.data.max_temp,
            wind_speed: response.data.wind_speed,
            wind_degrees: response.data.wind_degrees,
          };
  
          // Save the weather data to MongoDB
          const newWeatherEntry = new WeatherModel(weatherData);
          await newWeatherEntry.save();
  
          console.log(`Saved weather data for ${districtName}: Temp ${response.data.temp}, Humidity ${response.data.humidity}`);
        } catch (error) {
          console.error(
            `Error fetching or saving weather data for ${districtName}:`,
            error.message
          );
        }
      }
    } catch (error) {
      console.error(`Error fetching district coordinates:`, error.message);
    }
  };