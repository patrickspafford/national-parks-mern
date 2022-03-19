const express = require('express')
const ParkVisit = require('../../../models/ParkVisit')
const router = express.Router()
const Visitor = require('../../../models/Visitor')

router.get('/:id', (req, res) => {
    Visitor.findById(req.params.id)
      .populate('visits')
      .then(visitor => res.json(visitor))
      .catch(err => {
          console.error(err)
          res.status(404).json({ novisitorfound: 'No Visitor Found'})
      })
})

router.put('/:id', (req, res) => {
    Visitor.findByIdAndUpdate(req.params.id, req.body)
      .then(visitor => res.json(visitor))
      .catch(err => {
          console.error(err)
          res.status(400).json({ error: 'Unable to update visitor'})
      })
})

router.delete('/:id', (req, res) => {
    Visitor.findByIdAndRemove(req.params.id, req.body)
      .then(async visitor => {
          await ParkVisit.deleteMany({
              visitor: visitor._id
          })
          res.json(visitor)
      })
      .catch(err => {
          console.error(err)
          res.status(404).json({ error: 'No such visitor' })
      })
})

module.exports = router