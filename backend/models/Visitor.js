const mongoose = require('mongoose')

const VisitorSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    state: {
        type: String
    },
    country: {
        type: String,
    },
    visits: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'visit',
    }]
})

module.exports = Visitor = mongoose.model('visitor', VisitorSchema)