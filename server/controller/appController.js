const AirQualityModel = require("../model/AirQualityModel");
const CountryAirQuality = require("../model/CountryAqiModel");
const DistrictCoordinatesModel = require("../model/DistrictCoordinatesModel");
const OrganizationModel = require("../model/OrganizationModel");
const CityData = require("../model/PredictedAQIModel");
const UserModel = require("../model/UserModel");
const WeatherModel = require("../model/WeatherModel");
const { sendAlertEmail } = require("../nodemailer/email");
const { generateOTP, generateTokenAndSetCookie } = require("../utils/jwtconfiguration");
const { hashPassword, verifyPassword } = require("../utils/password");
const { fetchAndStoreDistrictCoordinates } = require("./coordinatesContoller");
const { fetchAndStoreAQIData, fetchAndStoreDistrictWeather, fetchAndStoreAQIDataCountry } = require("./weatherController");

const axios=require('axios')

module.exports.signup = async (req, res) => {
  const { email, password, name, phNumber, address } = req.body;
  
  try {
    if (!email || !password || !name || !phNumber || !address) {
      throw new Error("All fields are required");
    }

    const userAlreadyExists = await UserModel.findOne({ email });
    if (userAlreadyExists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // Password hashing
    const hash = await hashPassword(password);

    // Generating OTP for verification
    const verificationToken = generateOTP();

    // Create new user
    const user = new UserModel({
      email,
      password: hash,
      phNumber,
      address,
      name,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    });

    await user.save();

    // Fetch AQI data for the district
    const district = address;
    const aqiData = await AirQualityModel.findOne({ district });

    // Fetch weather data for the district
    const weatherData = await WeatherModel.findOne({ district });

    // Predict AQI (integrating predictedAqi logic)
    const cityData = await CityData.findOne({ district });
    if (!cityData) {
      return res.status(404).json({ message: "City data not found" });
    }

    // JWT token generation
    generateTokenAndSetCookie(res, user._id);

    // Respond with the user, AQI, weather, and city data
    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
      aqiData: aqiData || null,
      weatherData: weatherData || null,
      cityData: cityData || null,  // Include the city data in the response
    });
  } catch (error) {
    console.error("Error during signup:", error);
    return res.status(400).json({ success: false, message: error.message });
  }
};


module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    const passwordValidate =await verifyPassword(user.password, password);
    if (!passwordValidate) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }
    generateTokenAndSetCookie(res, user._id);

    await user.save();

    const district = user.address;

    const aqiData = await AirQualityModel.findOne({ district });

    const weatherData = await WeatherModel.findOne({ district });

    const cityData = await CityData.findOne({ district });

    return res.status(200).json({
      success: true,
      message: "LoggedIn Successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
      aqiData: aqiData || null,
      weatherData: weatherData || null,
      cityData: cityData || null,  // Include the city data in the response
    });
  } catch (err) {
    console.log("Error in Login !:", err);
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports.logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    success: true,
    message: "Logged Out Successfully",
  });
};

module.exports.saveDistrictAQI = async (req, res) => {
  try {
    await fetchAndStoreAQIData();
    res.status(200).json({ message: "AQI data saved for all districts" });
  } catch (error) {
    console.error("Error saving AQI data for all districts:", error.message);
    res
      .status(500)
      .json({ error: "Failed to save AQI data for all districts" });
  }
};

module.exports.saveDistrictCoordinates = async (req, res) => {
  try {
    await fetchAndStoreDistrictCoordinates();
    res
      .status(200)
      .json({ message: "Coordinates data saved for all districts" });
  } catch (error) {
    console.error(
      "Error saving coordinates data for all districts:",
      error.message
    );
    res
      .status(500)
      .json({ error: "Failed to save coordinates data for all districts" });
  }
};

module.exports.saveDistrictWeather = async (req, res) => {
  try {
    await fetchAndStoreDistrictWeather();
    res.status(200).json({ message: "Weather data saved for all districts" });
  } catch (error) {
    console.error(
      "Error saving weather data for all districts:",
      error.message
    );
    res
      .status(500)
      .json({ error: "Failed to save weather data for all districts" });
  }
};

module.exports.checkAuth = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("Error in checkAuth:", error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports.updateData = async (req, res) => {
  const user = req.user; 

  try {
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User not authenticated" });
    }

    const district = user.address; // Using the user's address as the district name

    // Fetching the coordinates for the district
    const districtCoordinates = await DistrictCoordinatesModel.findOne({
      district,
    });

    if (!districtCoordinates) {
      return res
        .status(404)
        .json({ success: false, message: "District coordinates not found" });
    }

    const { coordinates } = districtCoordinates;

    // Fetching updated AQI data for the district
    const aqiResponse = await axios.get(
      `https://api.api-ninjas.com/v1/airquality?city=${district}`,
      {
        headers: {
          "X-Api-Key": process.env.API_NINJAS_KEY, 
        },
      }
    );

 
    const aqiData = {
      district,
      CO: aqiResponse.data.CO,
      NO2: aqiResponse.data.NO2,
      O3: aqiResponse.data.O3,
      SO2: aqiResponse.data.SO2,
      PM2_5: aqiResponse.data["PM2.5"],
      PM10: aqiResponse.data.PM10,
      overall_aqi: aqiResponse.data.overall_aqi,
    };

    // Fetching updated weather data for the district using its coordinates
    const weatherResponse = await axios.get(
      `https://api.api-ninjas.com/v1/weather?lat=${coordinates.latitude}&lon=${coordinates.longitude}`,
      {
        headers: {
          "X-Api-Key": process.env.API_NINJAS_KEY, 
        },
      }
    );

    const weatherData = {
      district,
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
      cloud_pct: weatherResponse.data.cloud_pct,
      temp: weatherResponse.data.temp,
      feels_like: weatherResponse.data.feels_like,
      humidity: weatherResponse.data.humidity,
      min_temp: weatherResponse.data.min_temp,
      max_temp: weatherResponse.data.max_temp,
      wind_speed: weatherResponse.data.wind_speed,
      wind_degrees: weatherResponse.data.wind_degrees,
    };

    // Updating both models in parallel
    await Promise.all([
      AirQualityModel.updateOne({ district }, aqiData, { upsert: true }),
      WeatherModel.updateOne({ district }, weatherData, { upsert: true }),
    ]);

    // Sending a combined response
    return res.status(200).json({
      success: true,
      message: "AQI and Weather data updated successfully",
      aqiData,
      weatherData,
    });
  } catch (error) {
    console.error("Error updating data:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};


module.exports.checkPredictedData = async (req, res) => {
  try {
    // Fetch all users from the collection
    const users = await UserModel.find({});

    // Create an array to store the results
    const result = [];

    for (const user of users) {
      // Extract user's address
      const userAddress = user.address;

      // Fetch predicted AQI for the user's district
      const aqiData = await CityData.findOne({ district: userAddress });

      if (aqiData) {
        // Scan all days in the predicted AQI data
        aqiData.data.forEach(dayData => {
          const day = dayData.day;
          const highAQI = dayData.details.aqi.high;

          // Check if AQI exceeds 150 on any day
          if (highAQI > 150) {
            // Call the function to send an alert email
            sendAlertEmail(user.email, user.name, day, highAQI, user.address);
          }
        });
      }
    }

    // Send a success response after processing all users
    res.status(200).json({
      message: "AQI check completed and emails sent where necessary.",
      success: true
    });

  } catch (error) {
    // Send an error response in case of failure
    res.status(500).json({
      message: "An error occurred while checking AQI.",
      error: error.message,
      success: false
    });
  }
};

module.exports.saveAllCountryAQI=async (req,res)=>{
  try {
    await fetchAndStoreAQIDataCountry();
    res.status(200).json({ message: "AQI data saved for all country" });
  } catch (error) {
    console.error("Error saving AQI data for all country:", error.message);
    res
      .status(500)
      .json({ error: "Failed to save AQI data for all country" });
  }
}

module.exports.countryAQI=async(req,res)=>{
  try {
    // Query to get only 'countryName' and 'overallAqi' from all countries
    const countries = await CountryAirQuality.find({}, 'countryName overallAqi');

    // Send the response with the filtered data
    res.status(200).json(countries);
  } catch (error) {
    // Handle error
    console.error('Error fetching country AQI data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports.countryPm2_5=async(req,res)=>{
  try {
    // Query to get only 'countryName' and 'overallAqi' from all countries
    const countries = await CountryAirQuality.find({}, 'countryName pm25Aqi');

    // Send the response with the filtered data
    res.status(200).json(countries);
  } catch (error) {
    // Handle error
    console.error('Error fetching country AQI data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports.countryOzone=async(req,res)=>{
  try {
    // Query to get only 'countryName' and 'overallAqi' from all countries
    const countries = await CountryAirQuality.find({}, 'countryName o3Aqi');

    // Send the response with the filtered data
    res.status(200).json(countries);
  } catch (error) {
    // Handle error
    console.error('Error fetching country AQI data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports.orgSignUp=async(req,res)=>{
   const { email, password, name, phNumber, address,type,regNum,image } = req.body;
  
  try {
    if (!email || !password || !name || !phNumber || !address || !type || !regNum) {
      throw new Error("All fields are required");
    }
    const orgAlreadyExists = await OrganizationModel.findOne({ email });
    if (orgAlreadyExists) {
      return res
        .status(400)
        .json({ success: false, message: "Organization already exists" });
    }

    const hash = await hashPassword(password);

    // Generating OTP for verification
    const verificationToken = generateOTP();

    const org = new OrganizationModel({
      email,
      password: hash,
      phNumber,
      address,
      name,
      type,
      regNum,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    });

    await org.save();
    const district = address;
    const aqiData = await AirQualityModel.findOne({ district });

    // Fetch weather data for the district
    const weatherData = await WeatherModel.findOne({ district });

    // Predict AQI (integrating predictedAqi logic)
    const cityData = await CityData.findOne({ district });
    if (!cityData) {
      return res.status(404).json({ message: "City data not found" });
    }

    // JWT token generation
    generateTokenAndSetCookie(res, org._id);

    // Respond with the user, AQI, weather, and city data
    res.status(201).json({
      success: true,
      message: "Org created successfully",
      user: {
        ...org._doc,
        password: undefined,
      },
      aqiData: aqiData || null,
      weatherData: weatherData || null,
      cityData: cityData || null,  // Include the city data in the response
    });
  } catch (error) {
    console.error("Error during signup:", error);
    return res.status(400).json({ success: false, message: error.message });
  }
};