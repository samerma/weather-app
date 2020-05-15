const express = require('express')
const router = express.Router()
const request = require('request')
const urllib = require('urllib')
const apiKey = 'f5052a6fc2e7f9836ff47bcd3a18f7a8'
const City = require('../models/City.js')

router.get('/city/:cityName', function (req, res) {
    const cityName = req.params.cityName
    const apiURL = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=Metric&appid=${apiKey}`
    //request(apiURL, function (error, response, body) {
    urllib.request(apiURL, function (err, data, response) {
        console.log(JSON.parse(data));
        if (err) {
            throw err
        }
        else if (JSON.parse(data).cod == '404') {
            res.end()
            console.log('aaaaa');
        }
        else {
            const result = JSON.parse(data)
            const city = new City({
                name: result.name,
                temperature: result.main.temp,
                condition: result.weather[0].description,
                conditionPic: result.weather[0].icon
            })
            res.send(city)
        }
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
    City.deleteOne({ name: cityName }, function (error, deletedCity) {
        City.find({}, function (error, cities) {
            console.log(deletedCity)
            res.send(cities)// after deletion return updated collection of cities
        })
    })
})

module.exports = router