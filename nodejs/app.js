const express  = require('express');
const app = express();
const path = require('path');
const serverInfo = require('./Global/constants')
const authRoutes = require('./routes/authRoutes')
const productRoutes =require('./routes/productRoutes')
const cors = require('cors');
// const bodyParser = require('body-parser');
const { port } = require('./configuration/config');
// import {mongoose} from "mongoose"
 require('./database/db');
// mongoose.Promise = global.Promise;
// mongoose.connect(databaseConfig.db,{
//     useNewUrlParser: true, useUnifiedTopology: true
// }).then(()=>{
//     console.log("Database connected successfully")
// },err=>{
//     console.log("Database not connected")
// })
// app.use(express.json());
app.use(express.json({limit: '50mb'}));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// app.use(express.urlencoded({limit: '50mb'}));
app.use(cors());
app.listen(port|| 8000,()=>{
    console.log(serverInfo.serverMessage.message)
})


app.use(authRoutes)
app.use(productRoutes)