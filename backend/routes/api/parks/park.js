const express = require('express')
const Attraction = require('../../../models/Attraction')
const router = express.Router()
const NationalPark = require('../../../models/NationalPark')
const ParkVisit = require('../../../models/ParkVisit')

router.get('/:id', (req, res) => {
    NationalPark.findOne({ _id: req.params.id })
      .populate('attractions')
      .populate('visits')
      .then(park => res.json(park))
      .catch(err => {
          console.error(err)
          res.status(404).json({ noparkfound: 'No Park Found'})
      })
})

router.put('/:id', (req, res) => {
    NationalPark.findByIdAndUpdate(req.params.id, req.body)
      .then(park => res.json(park))
      .catch(err => {
          console.error(err)
          res.status(400).json({ error: 'Unable to update park.'})
      })
})

router.delete('/:id', (req, res) => {
    NationalPark.findByIdAndRemove(req.params.id, req.body)
      .then(async park => {
          await ParkVisit.deleteMany({
              park: park._id
          })
          await Attraction.deleteMany({
              park: park._id
          })
          res.json(park)
      })
      .catch(err => {
          console.error(err)
          res.status(404).json({ error: 'No such park.'})
      })
})

module.exports = router