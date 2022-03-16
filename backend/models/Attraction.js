const mongoose = require('mongoose')

const AttractionSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    park: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'park',
        required: true,
    }
})

module.exports = Attraction = mongoose.model('attraction', AttractionSchema)