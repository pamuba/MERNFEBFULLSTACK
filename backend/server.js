const express = require('express')
const cors = require('cors')
require('dotenv').config()
const mongoose = require('mongoose')

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
//body parser
app.use(express.json())

const uri = process.env.URI
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true  })

const connection = mongoose.connection;
connection.once('open', (err)=>{
    if(err)
    {
        console.log(err)
    }
    else{
        console.log("Connected to MongoDB")
    }
})

const exerciseRouter = require('./routes/exercises')
const userRouter = require('./routes/users')

//localhost:3000/users
app.use('/exercises', exerciseRouter)
app.use('/users', userRouter)

app.listen(port, (err)=>{
    if(err)
    {
        console.log(err)
    }
    else
        console.log(`Server is running on port:${port}`)
})