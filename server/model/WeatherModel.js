// WeatherModel.js
const mongoose = require("mongoose");

const weatherSchema = new mongoose.Schema(
    {
      district: {
        type: String,
        required: true,
      },
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    cloud_pct: {
      type: Number,
      required: true,
    },
    temp: {
      type: Number,
      required: true,
    },
    feels_like: {
      type: Number,
      required: true,
    },
    humidity: {
      type: Number,
      required: true,
    },
    min_temp: {
      type: Number,
      required: true,
    },
    max_temp: {
      type: Number,
      required: true,
    },
    wind_speed: {
      type: Number,
      required: true,
    },
    wind_degrees: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Weather", weatherSchema);
