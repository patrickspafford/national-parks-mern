const express = require('express')
const router = express.Router()
const Attraction = require('../../../models/Attraction')
const NationalPark = require('../../../models/NationalPark')

/*
GET
*/

router.get('/', (req, res) => {
    Attraction.find()
      .then(attraction => res.json(attraction))
      .catch(err => {
          console.error(err)
          res.status(404).json({ noattractionsfound: 'No Attractions Found.'})
      })
})


/*
POST
*/

router.post('/', (req, res) => {
    Attraction.create(req.body)
      .then(async attraction => {
          const parentPark = await NationalPark.findById(req.body.park)
          parentPark.attractions.push(attraction._id)
          await parentPark.save()
          return res.json(attraction)
      })
      .catch(err => {
          console.error(err)
          res.status(400).json({ error: 'Unable to create attraction.'})
      })
})

/*
PUT
*/

/*
DELETE
*/


module.exports = router