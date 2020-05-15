const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const api = require('./server/routes/api')
const path = require('path')

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/WeatherDB", { useNewUrlParser: true })
    .then(() => { console.log("Succesfully Connected to the Mongodb Database") })
    .catch(() => { console.log("Error Connecting to the Mongodb Database") })

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))
app.use('/', api)

const port = 3001
app.listen(process.env.PORT || port, function () {
    console.log(`Running on port ${port}`)
})