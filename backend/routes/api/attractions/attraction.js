const express = require('express')
const router = express.Router()
const Attraction = require('../../../models/Attraction')

router.get('/:id', (req, res) => {
    Attraction.findById(req.params.id)
      .then(attraction => res.json(attraction))
      .catch(err => res.status(404).json({ noattractionfound: 'No Attraction Found'}))
})

router.put('/:id', (req, res) => {
    Attraction.findByIdAndUpdate(req.params.id, req.body)
      .then(attraction => res.json(attraction))
      .catch(err => {
          console.error(err)
          res.status(400).json({ error: 'Unable to update attraction'})
      })
})

router.delete('/:id', (req, res) => {
    Attraction.findByIdAndRemove(req.params.id, req.body)
      .then(attraction => res.json(attraction))
      .catch(err => {
          console.error(err)
          res.status(404).json({ error: 'No such attraction' })
      })
})

module.exports = router