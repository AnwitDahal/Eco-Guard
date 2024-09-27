const axios = require("axios");
const { districts } = require("../assests/district");
const DistrictCoordinatesModel = require("../model/DistrictCoordinatesModel");

module.exports.fetchAndStoreDistrictCoordinates = async () => {
  for (const district of districts) {
    try {
      // Fetch coordinates for the current district
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${district}&key=${process.env.OPENCAGE_API_KEY}`, // Use your OpenCage API key
      );

      // Check if results are available
      if (response.data.results && response.data.results.length > 0) {
        const { lat, lng } = response.data.results[0].geometry;

        // Structuring the data according to the Mongoose model
        const coordinatesData = {
          district,
          coordinates: {
            latitude: lat,
            longitude: lng,
          },
        };

        // Saving the data to MongoDB
        const newDistrictCoordinates = new DistrictCoordinatesModel(coordinatesData);
        await newDistrictCoordinates.save();

        console.log(`Saved coordinates for ${district}: Latitude ${lat}, Longitude ${lng}`);
      } else {
        console.warn(`No results found for ${district}`);
      }
    } catch (error) {
      console.error(
        `Error fetching or saving coordinates for ${district}:`,
        error.message
      );
    }
  }
};
