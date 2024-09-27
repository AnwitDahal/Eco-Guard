const { signup, login, logout, saveDistrictAQI, saveDistrictCoordinates, saveDistrictWeather } = require("../controller/appController");
const express=require('express')
const router=express.Router();

router.post('/signup',signup);

router.post('/login',login);

router.post('/logout',logout);

router.get('/save-all-districts',saveDistrictAQI)

router.get('/save-district-coordinates',saveDistrictCoordinates);

router.get('/save-district-weather',saveDistrictWeather);

module.exports = router;