const express  = require('express');
const app = express();
const path = require('path');
const authRoutes = require('./routes/authRoutes')
const productRoutes =require('./routes/productRoutes')
const cors = require('cors')
const mongoose  = require('mongoose')
// import {mongoose} from "mongoose"
const databaseConfig = require('./database/db');
// mongoose.Promise = global.Promise;
mongoose.connect(databaseConfig.db,{
    useNewUrlParser: true, useUnifiedTopology: true
}).then(()=>{
    console.log("Database connected successfully")
},err=>{
    console.log("Database not connected")
})
app.use(express.json());
app.use(cors());
app.listen(process.env.PORT || 8000,()=>{
    console.log("server running on port 8000..")
})

// app.get('/',(req,res)=>{
//     res.send("Welcome")
// })

app.use(authRoutes)
app.use(productRoutes)