// MARK: - Node Imports
const express = require('express')
const http = require('http')
const https = require('https')
const fs = require('fs')
require('dotenv').config()
// MARK: - Local Imports
const connectToDB = require('./config/db')
const routes = require('./routes/api/parks')
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
app.use('/api/parks', routes)

// MARK: - Start Server
http.createServer(app).listen(ports.http, () => console.log('National park (HTTP) server started'))
https.createServer(httpsOptions, app).listen(ports.https, () => console.log('National Park (HTTPS) server started.'))