const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const jwt = require('jsonwebtoken');
require("dotenv").config();
var cors = require('cors');


//Routes imports
const publicRoutes = require('./routes/public');
const newsRoutes = require('./routes/new');
const userRoutes = require('./routes/user');
const newsourcesRoutes = require('./routes/newsource');
const registerRoutes = require('./routes/register');
const sessionRoutes = require('./routes/session');
const categoryRoutes = require('./routes/category');
//Mongo DB Connection
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to Database :D"))
  .catch((err) => console.error(err));

//Listening Port
const port = 8000;

// cors
app.use(cors());

// ========  Middlewares  =====
app.use(bodyParser.json());

//user register
app.use('/api', registerRoutes);

//user session
app.use('/api', sessionRoutes);
// public 
app.use('/api', publicRoutes);
//auth
app.use(function (req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, process.env.MYSECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    req.user = user;

    next();
  });
});

//===========================  Routes ================================
// Users 
app.use('/api', userRoutes);
// News 
app.use('/api', newsRoutes);
// Sources 
app.use('/api', newsourcesRoutes);

// category
app.use('/api', isAdmin, categoryRoutes);

function isAdmin(req, res, next) {

  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  jwt.verify(token, process.env.MYSECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    if (user.rol !== 1) {
      return res.status(403).json({ message: 'Acceso denegado.' });
    }
    next();
  });
}



app.listen(port, () => console.log('Server listening on port', port));