const express = require('express')
const router = express.Router()
const NationalPark = require('../../models/NationalPark')

/*
GET
*/

router.get('/', (req, res) => {
    NationalPark.find()
      .then(parks => res.json(parks))
      .catch(err => res.status(404).json({ noparksfound: 'No Parks Found.'}))
})

router.get('/:id', (req, res) => {
    NationalPark.findById(req.params.id)
      .then(park => res.json(park))
      .catch(err => res.status(404).json({ noparkfound: 'No Park Found'}))
})

/*
POST
*/

router.post('/', (req, res) => {
    NationalPark.create(req.body)
      .then(park => res.json(park))
      .catch(err => {
          console.error(err)
          res.status(400).json({ error: 'Unable to create national park.'})
      })
})

/*
PUT
*/

router.put('/:id', (req, res) => {
    NationalPark.findByIdAndUpdate(req.params.id, req.body)
      .then(park => res.json(park))
      .catch(err => {
          console.error(err)
          res.status(400).json({ error: 'Unable to update park.'})
      })
})

/*
DELETE
*/

router.delete('/:id', (req, res) => {
    NationalPark.findByIdAndRemove(req.params.id, req.body)
      .then(park => res.json(park))
      .catch(err => {
          console.error(err)
          res.status(404).json({ error: 'No such park.'})
      })
})

module.exports = router