const express = require('express')
const router = express.Router()

// @route GET api/
// @description hello
// @access Public
router.get('/', (req, res) => res.send('API route test'))