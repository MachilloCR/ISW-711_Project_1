const express = require ('express');
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config();

//Mongo DB Connection
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI)
.then(()=> console.log("Connected to Database :D"))
.catch((err)=> console.error(err));

//Listening Port
const port = 8000;

//Routes imports
const newsRoutes = require('./routes/new');
const userRoutes = require('./routes/user');
const sourcesRoutes = require('./routes/source');

app.use(bodyParser.json());

//===========================  Routes ================================
// Users 
app.use('/api',userRoutes);


// News 
app.use('/api',newsRoutes);

// Sources 
app.use('/api',sourcesRoutes);


app.listen(port, () => console.log('Server listening on port', port));