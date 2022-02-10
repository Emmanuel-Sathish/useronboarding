const mongoose   = require('mongoose')
const express    = require('express')
const morgan     = require('morgan')
const bodyParser = require('body-parser')

mongoose.connect('mongodb+srv://emmanuel:emmanuelrko@cluster0.tn0nz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{useNewUrlParser:true, useUnifiedTopology:true})
const db= mongoose.connection

db.on('error',(err)=>{
    console.log(err)
})

db.once('open',()=>{
    console.log('Database Connection Established!')
})

const app = express()
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())


const PORT = process.env.PORT || 3001
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})


//route call
const coupRoute = require('./routes/coup')

app.use('/api/coup',coupRoute) 

