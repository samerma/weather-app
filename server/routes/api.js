const express = require('express')
const router = express.Router()
const urllib = require('urllib')
const apiKey = 'f5052a6fc2e7f9836ff47bcd3a18f7a8'
const City = require('../models/City.js')

router.get('/city/:cityName', function (req, res) {
    const cityName = req.params.cityName
    const apiURL = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=Metric&appid=${apiKey}`
    //request(apiURL, function (error, response, body) {
    urllib.request(apiURL, function (err, data, response) {
        if (err) {
            throw err
        }
        else if (JSON.parse(data).cod == '404') {
            res.end()
        }
        else {
            const result = JSON.parse(data)
            const city = new City({
                name: result.name,
                temperature: result.main.temp,
                condition: result.weather[0].description,
                conditionPic: result.weather[0].icon,
                updatedAt: new Date()
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
        conditionPic: req.body.conditionPic,
        updatedAt: req.body.updatedAt
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

router.put('/city/:cityName', function (req, res) {
    const cityName = req.params.cityName
    const apiURL = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=Metric&appid=${apiKey}`
    urllib.request(apiURL, function (err, data, response) {
        const result = JSON.parse(data)
        const newUpdate = new Date()
        City.findOne({ 'name': cityName }, function (error, city) {
            city.temperature = result.main.temp
            city.condition = result.weather[0].description
            city.conditionPic = result.weather[0].icon
            city.updatedAt = newUpdate
            city.save(function (err, c) {
                res.send(c)
            })
        })
    })
})

module.exports = router