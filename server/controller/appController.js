const UserModel = require("../model/UserModel");
const { generateOTP, generateTokenAndSetCookie } = require("../utils/jwtconfiguration");
const { hashPassword, verifyPassword } = require("../utils/password");
const { fetchAndStoreDistrictCoordinates } = require("./coordinatesContoller");
const { fetchAndStoreAQIData, fetchAndStoreDistrictWeather } = require("./weatherController");

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

    //password hashing
    const hash = await hashPassword(password);

    //generating otp for verification
    const verificationToken = generateOTP();

    const user = new UserModel({
      email,
      password: hash,
      phNumber,
      address,
      name,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, //24 hours
    });

    await user.save();


    //jwt
    generateTokenAndSetCookie(res, user._id);


    res.status(201).json({
      success: true,
      message: "User created succesfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
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

    return res.status(200).json({
      success: true,
      message: "LoggedIn Successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
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