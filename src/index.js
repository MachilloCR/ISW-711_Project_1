const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const jwt = require('jsonwebtoken');
require("dotenv").config();
const { saveSession, getSession } = require('./controllers/sessionController');

//Routes imports
const newsRoutes = require('./routes/new');
const userRoutes = require('./routes/user');
const sourcesRoutes = require('./routes/source');
const registerRoutes = require('./routes/register');
const sessionRoutes = require('./routes/session');

//Mongo DB Connection
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to Database :D"))
  .catch((err) => console.error(err));

//Listening Port
const port = 8000;

// ========  Middlewares  =====
app.use(bodyParser.json());

//user register
app.use('/api', registerRoutes);

//user session
app.use('/api', sessionRoutes);

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
app.use('/api', sourcesRoutes);



app.listen(port, () => console.log('Server listening on port', port));