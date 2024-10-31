const mongoose = require('mongoose');

// Schema for the AQI details of a single day
const aqiDetailsSchema = new mongoose.Schema({
  Pm2_5: { type: Number },  // Mongoose doesn't support '.' in keys, so using underscore
  Pm10: { type: Number },
  No2: { type: Number },
  So2: { type: Number },
  Co: { type: Number },
  O3: { type: Number },
  overall_aqi: { type: Number }
}, { _id: false });  // Disable _id for embedded schema

// Schema for each day's AQI data
const dayAQISchema = new mongoose.Schema({
  date: { type: Date, required: true },
  // day: { type: String, required: true },
  details: { type: aqiDetailsSchema, required: true }
}, { _id: false });

// Schema for the entire AQI record for a district
const lastAQISchema = new mongoose.Schema({
  district: { type: String, required: true },
  data: [dayAQISchema]  // Array of day-based AQI data
}, { timestamps: true });

// Define the model and explicitly specify the collection name as 'last_aqi'
module.exports = mongoose.model('LastAQI', lastAQISchema, 'last_aqi');
