const express= require('express')
const mongoose = require('mongoose')
const DATA = 'mongodb://0.0.0.0/login?readPreference=primaryPreferred'
const cors = require('cors')
const port = 5000
const app = express()


app.use(cors())

mongoose.connect(DATA)
const index = mongoose.connection

index.once('open' ,()=>{
   console.log('connect to mongoDB') 
})

index.on('error' , (error)=>{
        console.log(error)
})

app.use(express.json())
app.use('/api' , require('./Module/user'))
app.listen(port , ()=>{
    console.log(`run on http://localhost:${port}`)
})
