const express    = require('express')
const mongoose   = require('mongoose')
const morgan     = require('morgan')
const bodyParser = require('body-parser')

// const AuthRoute = require('./routes/auth')
// const UserRoute=require('./routes/user') 
// const EmployeeRoute= require('./routes/employee') 

mongoose.connect('mongodb+srv://emmanuel:emmanuelrko@cluster0.tn0nz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{useNewUrlParser:true, useUnifiedTopology:true})
const db= mongoose.connection 

db.on('error',(err)=> {
    console.log('err')
})

db.once('open',()=> {
    console.log('Database Connection Established!')
})

const app= express()
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.get('/',(req ,res)=>{
    res.send('http request')
    });

const PORT = process.env.PORT ||3000
app.listen(PORT, ()=> {
    console.log(`server is running on port ${PORT}`)
})

const AuthRoute = require('./routes/auth')
// const UserRoute=require('./routes/user') 
// const EmployeeRoute= require('./routes/employee') 

//route call 
app.use('/api', AuthRoute)
// app.use('/api/user',UserRoute) 
// app.use('/api/employee',EmployeeRoute) 
