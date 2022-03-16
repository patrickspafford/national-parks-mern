const mongoose = require('mongoose')

const ParkVisitSchema = mongoose.Schema({
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    description: {
        type: String
    },
    park: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'park',
        required: true
    },
    visitors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'visitor',
    }],
    attractionsVisited: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'attraction'
    }]
})

module.exports = ParkVisit = mongoose.model('visit', ParkVisitSchema)