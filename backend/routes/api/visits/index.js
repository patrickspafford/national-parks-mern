const express = require('express')
const router = express.Router()
const Visit = require('../../../models/ParkVisit')

/*
GET
*/

router.get('/', (req, res) => {
    Visit.find()
      .then(visit => res.json(visit))
      .catch(err => res.status(404).json({ novisitsfound: 'No Visits Found.'}))
})


/*
POST
*/

router.post('/', (req, res) => {
    Visit.create(req.body)
      .then(visit => res.json(visit))
      .catch(err => {
          console.error(err)
          res.status(400).json({ error: 'Unable to create visit.'})
      })
})

/*
PUT
*/

/*
DELETE
*/


module.exports = router