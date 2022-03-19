const express = require('express')
const router = express.Router()
const Visitor = require('../../../models/Visitor')

/*
GET
*/

router.get('/', (req, res) => {
    Visitor.find()
      .populate('visits')
      .then(visitor => res.json(visitor))
      .catch(err => {
        console.error(err)
        res.status(404).json({ novisitorsfound: 'No Visitors Found.'})
      })
})


/*
POST
*/

router.post('/', (req, res) => {
    Visitor.create(req.body)
      .then(visitor => res.json(visitor))
      .catch(err => {
          console.error(err)
          res.status(400).json({ error: 'Unable to create visitor.'})
      })
})

/*
PUT
*/

/*
DELETE
*/


module.exports = router