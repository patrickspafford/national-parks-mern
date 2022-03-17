// MARK: - Node Imports
const express = require('express')
const http = require('http')
const https = require('https')
const fs = require('fs')
require('dotenv').config()
// MARK: - Local Imports
const connectToDB = require('./config/db')
// PARK
const allParkRoutes = require('./routes/api/parks')
const specificParkRoute = require('./routes/api/parks/park')
// VISIT
const allVisitRoute = require('./routes/api/visits')
const specificVisitRoute = require('./routes/api/visits/visit')
// VISITOR
const allVisitorsRoute = require('./routes/api/visitors')
const specificVisitorRoute = require('./routes/api/visitors/visitor')
// MARK: - Constants
const ports = {
    http: process.env.HTTP_PORT || 8000,
    https: process.env.HTTPS_PORT || 8001
}
const httpsOptions = {
    key: fs.readFileSync(process.env.KEY_PATH),
    cert: fs.readFileSync(process.env.CERT_PATH)
}
const app = express()
app.use(express.json())
app.use(express.urlencoded())
connectToDB()
// MARK: - Handlers
app.get('/', (req, res) => res.send('Hello world!'))
app.use('/api/parks', allParkRoutes)
app.use('/api/parks', specificParkRoute)
app.use('/api/visits', allVisitRoute)
app.use('/api/visits', specificVisitRoute)
app.use('/api/visitors', allVisitorsRoute)
app.use('/api/visitors', specificVisitorRoute)
// MARK: - Start Server
http.createServer(app).listen(ports.http, () => console.log('National park (HTTP) server started'))
https.createServer(httpsOptions, app).listen(ports.https, () => console.log('National Park (HTTPS) server started.'))