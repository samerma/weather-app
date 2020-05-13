const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const api = require('./server/routes/api')
const path = require('path')

mongoose.connect("mongodb://localhost/WeatherDB", { useNewUrlParser: true })
    .then(() => { console.log("Succesfully Connected to the Mongodb Database") })
    .catch(() => { console.log("Error Connecting to the Mongodb Database") })

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))
app.use('/', api)

/////-----load data to DB---/////////
/* c = new City({
    name: 'tlv',
    temperature: 10,
    condition: 'good',
    conditionPic: 'pic'
})
c.save() */
//////////////////////////////////

const port = 3001
app.listen(port, function () {
    console.log(`Running on port ${port}`)
})