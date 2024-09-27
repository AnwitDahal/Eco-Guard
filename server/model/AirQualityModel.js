// AirQualityModel.js
const mongoose = require("mongoose");

const airQualitySchema = new mongoose.Schema(
  {
    district: { type: String, required: true },
    CO: {
      concentration: Number,
      aqi: Number,
    },
    NO2: {
      concentration: Number,
      aqi: Number,
    },
    O3: {
      concentration: Number,
      aqi: Number,
    },
    SO2: {
      concentration: Number,
      aqi: Number,
    },
    PM2_5: {
      // Mongoose doesn't support special characters, replace '.' with '_'
      concentration: Number,
      aqi: Number,
    },
    PM10: {
      concentration: Number,
      aqi: Number,
    },
    overall_aqi: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("AirQuality", airQualitySchema);
 