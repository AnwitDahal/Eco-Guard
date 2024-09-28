const { signup, login, logout, saveDistrictAQI, saveDistrictCoordinates, saveDistrictWeather, checkAuth, updateData, checkPredictedData, saveAllCountryAQI, countryAQI, countryPm2_5, countryOzone, orgSignUp } = require("../controller/appController");
const express=require('express');
const { verifyToken } = require("../middlewares/verifyToken");
const  router=express.Router();

router.post('/signup',signup);

router.post('/login',login);

router.post('/logout',logout);

router.get('/save-all-districts',saveDistrictAQI)

router.get('/save-district-coordinates',saveDistrictCoordinates);

router.get('/save-district-weather',saveDistrictWeather);

router.get("/check-auth",verifyToken,checkAuth)

router.post('/update-data',verifyToken,updateData)

router.get('/check-predicted-data',checkPredictedData)

router.get('/save-all-country-aqi',saveAllCountryAQI)

router.get('/country-aqi',countryAQI)

router.get('/country-pm2_5',countryPm2_5)

router.get('/country-ozone',countryOzone)

router.post('/organization-signup',orgSignUp)

module.exports = router;