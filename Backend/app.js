const express = require('express')
const app = express()
const unsubscribeRouter= require('./components/unsubscribeRouter')
const cors=require('cors')

app.use(express.json())
app.use(cors())
app.use(express.static('dist'))

app.use('/api/unsubscribe', unsubscribeRouter)

module.exports = app