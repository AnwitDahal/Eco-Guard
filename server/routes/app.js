const { signup, login, logout, saveDistrictAQI, saveDistrictCoordinates, saveDistrictWeather, checkAuth, updateData, checkPredictedData, saveAllCountryAQI, countryAQI, countryPm2_5, countryOzone, orgSignUp, lastSeven, nodetoPython, generateChallengesForOrgs, challengePhoto, loginOrg } = require("../controller/appController");
const express=require('express');
const { verifyToken, verifyTokenForUser, verifyTokenForOrg } = require("../middlewares/verifyToken");
const  router=express.Router();

router.post('/signup',signup);

router.post('/login',login);

router.post('/logout',logout);

router.get('/save-all-districts',saveDistrictAQI)

router.get('/save-district-coordinates',saveDistrictCoordinates);

router.get('/save-district-weather',saveDistrictWeather);

router.get("/check-auth",verifyTokenForUser,checkAuth)

router.post('/update-data',verifyTokenForUser,updateData)

router.get('/check-predicted-data',checkPredictedData)

router.get('/save-all-country-aqi',saveAllCountryAQI)

router.get('/country-aqi',countryAQI)

router.get('/country-pm2_5',countryPm2_5)

router.get('/country-ozone',countryOzone)

router.post('/organization-signup',orgSignUp)

router.get('/last-seven',lastSeven)

router.post('/nodetopy',nodetoPython)

router.get('/challenges',generateChallengesForOrgs)

router.post('/loginOrg',loginOrg);

module.exports = router;