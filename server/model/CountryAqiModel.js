const mongoose = require('mongoose');

// Defining the schema for air quality data
const countryairQualitySchema = new mongoose.Schema({
  countryName: {
    type: String,
    required: true,
    trim: true
  },
  o3Aqi: {
    type: Number,
    required: true
  },

  pm25Aqi: {
    type: Number,
    required: true
  },

  overallAqi: {
    type: Number,
    required: true
  }
}, {
  timestamps: true // Adds createdAt and updatedAt timestamps automatically
});


const CountryAirQuality = mongoose.model('CountryAQI', countryairQualitySchema);

module.exports = CountryAirQuality;
