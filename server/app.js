require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT
const router = require('./routes')
const errorHandler = require('./middlewares/error-handler')

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/', router)
app.use(errorHandler)

app.listen(PORT,()=>{
    console.log(`app running at port ${PORT}`)
})