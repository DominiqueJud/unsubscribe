const express = require('express')
const app = express()
const unsubscribeRouter= require('./components/unsubscribeRouter')
const cors=require('cors')
const languagesRouter = require('./components/languagesRouter')

app.use(express.json())
app.use(cors())
app.use(express.static('dist'))

app.use('/api/unsubscribe', unsubscribeRouter)
app.use('/langs', languagesRouter)

module.exports = app