const express = require('express')
const mongoose = require('mongoose')
const requireDir = require('require-dir')
const cors = require('cors')

// CONFIG
    // INITIALIZE APP
    const app = express()
    app.use(express.json())
    app.use(cors())

    // DATABASE: MONGODB
    mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true}).then(() => {
        console.log('DATABASE | ON |')
    })

    // REQUIREDIR
        requireDir('./src/models')

// ROUTES
app.use('/api', require('./src/routes'))

// OTHERS
const PORT = process.env.PORT || 3000
app.listen(PORT)