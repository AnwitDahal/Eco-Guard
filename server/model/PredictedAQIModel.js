const mongoose = require('mongoose');

// Define the inner schema for AQI details
const aqiSchema = new mongoose.Schema({
  low: { type: Number, required: true },
  high: { type: Number, required: true },
});

// Define the schema for details that include AQI and temperature
const detailsSchema = new mongoose.Schema({
  aqi: { type: aqiSchema, required: true },
  temperature: { type: Number, required: true },
});

// Define the schema for the date, day, and details
const dataSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  day: { type: String, required: true },
  details: { type: detailsSchema, required: true },
});

// Define the main schema for the city and its related data
const cityDataSchema = new mongoose.Schema({
  city: { type: String, required: true },
  data: { type: [dataSchema], required: true },
});

// Create the model using the cityDataSchema
const CityData = mongoose.model('CityData', cityDataSchema, 'predicted_aqi');

module.exports = CityData;
