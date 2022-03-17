const express = require('express')
const router = express.Router()
const Visit = require('../../../models/ParkVisit')

router.get('/:id', (req, res) => {
    Visit.findById(req.params.id)
      .then(visit => res.json(visit))
      .catch(err => res.status(404).json({ novisitfound: 'No Visit Found'}))
})

router.put('/:id', (req, res) => {
    Visit.findByIdAndUpdate(req.params.id, req.body)
      .then(visit => res.json(visit))
      .catch(err => {
          console.error(err)
          res.status(400).json({ error: 'Unable to update visit'})
      })
})

router.delete('/:id', (req, res) => {
    Visit.findByIdAndRemove(req.params.id, req.body)
      .then(visit => res.json(visit))
      .catch(err => {
          console.error(err)
          res.status(404).json({ error: 'No such visit' })
      })
})

module.exports = router