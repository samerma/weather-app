const express = require('express')
const router = express.Router()
const request = require('request')
const apiKey = 'f5052a6fc2e7f9836ff47bcd3a18f7a8'
const City = require('../models/City.js')

router.get('/city/:cityName', function (req, res) {
    const cityName = req.params.cityName
    const apiURL = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`
    request(apiURL, function (error, response, body) {
        const result = JSON.parse(body)
        res.send(result)
        console.log(result);
    })
})

router.get('/cities', function (req, res) {
    City.find({}, function (error, cities) {
        res.send(cities)
    })
})

router.post('/city', function (req, res) {
    const city = new City({
        name: req.body.name,
        temperature: req.body.temperature,
        condition: req.body.condition,
        conditionPic: req.body.conditionPic
    })
    city.save(function (error, c) {
        res.send(c)
    })
})

router.delete('/city/:cityName', function (req, res) {
    const cityName = req.params.cityName
    City.deleteOne({ name: cityName }, function (error, response) {
        res.send(response)
    })
})

module.exports = router