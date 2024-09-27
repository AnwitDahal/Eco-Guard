const cron = require('node-cron');
const { fetchAndStoreAQIData, fetchAndStoreDistrictWeather, fetchAndStoreAQIDataCountry } = require('../controller/weatherController');
const { checkPredictedData } = require('../controller/appController');

cron.schedule('3 1 * * *', async () => {

    try {
      console.log("Running AQI and Weather data updates at 1 AM");
  
      // Call your functions to update AQI and Weather data
      await fetchAndStoreAQIData();  // Update district-level AQI data
      await fetchAndStoreDistrictWeather();  // Update district-level weather data
      await fetchAndStoreAQIDataCountry();  // Update country-level AQI data
  
      console.log("AQI and Weather data updated successfully.");
    } catch (error) {
      console.error("Error updating AQI and Weather data:", error.message);
    }
  });


  cron.schedule('51 2 * * *', async () => {
    try {
      console.log("Running AQI prediction check at 2 AM");
      
      // Call the function to check predicted AQI data
      await checkPredictedData();
  
      console.log("AQI prediction check completed successfully.");
    } catch (error) {
      console.error("Error running AQI prediction check:", error.message);
    }
  });


