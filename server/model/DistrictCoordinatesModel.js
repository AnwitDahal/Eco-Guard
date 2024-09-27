const mongoose = require("mongoose");

const districtCoordinatesSchema = new mongoose.Schema(
  {
    district: { type: String, required: true, unique: true },
    coordinates: {
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("DistrictCoordinates", districtCoordinatesSchema);
