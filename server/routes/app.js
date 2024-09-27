const { signup, login, logout, saveDistrictAQI, saveDistrictCoordinates, saveDistrictWeather, checkAuth, updateData, predictedAqi } = require("../controller/appController");
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

module.exports = router;