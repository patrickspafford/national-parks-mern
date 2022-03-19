const express = require('express')
const router = express.Router()
const NationalPark = require('../../../models/NationalPark')

/*
GET
*/

router.get('/', (req, res) => {
    NationalPark.find()
      .populate('attractions')
      .populate('visits')
      .then(parks => res.json(parks))
      .catch(err => {
        console.error(err)
        res.status(404).json({ noparksfound: 'No Parks Found.'})
      })
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

/*
DELETE
*/


module.exports = router