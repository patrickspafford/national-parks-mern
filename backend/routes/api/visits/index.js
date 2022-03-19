const express = require('express')
const NationalPark = require('../../../models/NationalPark')
const ParkVisit = require('../../../models/ParkVisit')
const router = express.Router()
const Visit = require('../../../models/ParkVisit')
const Visitor = require('../../../models/Visitor')

/*
GET
*/

router.get('/', (req, res) => {
    Visit.find()
      .populate('visitors')
      .then(visit => res.json(visit))
      .catch(err => res.status(404).json({ novisitsfound: 'No Visits Found.'}))
})


/*
POST
*/

router.post('/', (req, res) => {
    Visit.create(req.body)
      .then(async visit => {
        // Park
        const thisPark = await NationalPark.findById(req.body.park)
        thisPark.visits.push(visit._id)
        await thisPark.save()
        // Visitor
        const thisVisitor = await Visitor.find(req.body.visitors)
        if (thisVisitor) {
          thisVisitor.visits.push(visit._id)
          await thisVisitor.save()
        }
        res.json(visit)
      })
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