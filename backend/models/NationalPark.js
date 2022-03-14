const mongoose = require('mongoose')

const NationalParkSchema  = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    state: {
        type: String,
    },
    description: {
        type: String,
    },
    yearEstablished: {
        type: Number,
    },
    acres: {
        type: Number,
    },
    updated_date: {
        type: Date,
        default: Date.now
    }
})

module.exports = NationalPark = mongoose.model('park', NationalParkSchema)