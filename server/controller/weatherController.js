const { districts } = require("../assests/district");
const axios=require('axios');
const AirQualityModel = require("../model/AirQualityModel");
const DistrictCoordinatesModel = require("../model/DistrictCoordinatesModel");
const WeatherModel = require("../model/WeatherModel");
const { countries, countryToCapitalMap, capitalToCountryMap } = require("../assests/countries");
const CountryAirQuality = require("../model/CountryAqiModel");

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
        await AirQualityModel.findOneAndUpdate(
          { district }, 
          aqiData, 
          { upsert: true, new: true } // upsert creates if not found, new returns the updated document
        );
  
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
          await WeatherModel.findOneAndUpdate(
            { district: districtName }, 
            weatherData, 
            { upsert: true, new: true } // upsert creates if not found
          );
  
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

  module.exports.fetchAndStoreAQIDataCountry = async () => {
    for (const countryOrCapital of countries) {
      // Get the actual country name using the capital or use the country itself
      const countryName = capitalToCountryMap[countryOrCapital] || countryOrCapital;
      const cityName = countryToCapitalMap[countryName] || countryName;
  
      try {
        // Fetch AQI data for the current capital or country
        const response = await axios.get(
          `https://api.api-ninjas.com/v1/airquality?city=${cityName}`,
          {
            headers: {
              'X-Api-Key': process.env.API_NINJAS_KEY, // Use API key from environment variables
            },
          }
        );
  
        // Map the response data to match the Mongoose model
        const aqiData = {
          countryName, // Save the country name in the database
          // coAqi: response.data.CO.aqi,
          // no2Aqi: response.data.NO2.aqi,
          o3Aqi: response.data.O3.aqi,
          // so2Aqi: response.data.SO2.aqi,
          pm25Aqi: response.data['PM2.5'].aqi, // Use bracket notation for 'PM2.5'
          // pm10Aqi: response.data.PM10.aqi,
          overallAqi: response.data.overall_aqi,
        };
  
        // Save the data to MongoDB
        await CountryAirQuality.findOneAndUpdate(
          { countryName }, 
          aqiData, 
          { upsert: true, new: true }
        );
  
        console.log(`Saved AQI data for ${countryName} (API call for ${cityName})`);
      } catch (error) {
        console.error(
          `Error fetching or saving AQI data for ${countryName} (API call for ${cityName}):`,
          error.message
        );
      }
    }
  };