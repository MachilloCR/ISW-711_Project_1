const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const UserModel = require('../Models/user');
const SessionModel = require('../Models/session');

//login
router.post('/session', async (req, res) => {
  const { email, password } = req.body;

  //searches for a user that has the specified email and password.
  const user = await UserModel.model.findOne({ email: email, password: password });

  if (!user) {
    res.status(400).json({ message: 'User not found' });
  }

  // const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!password) {
    res.status(400).json({ message: 'Invalid credentials' });
  }

  //create a new session
  const session = new SessionModel.model;

  const token = jwt.sign({ id: user._id, rol: user.role_id }, process.env.MYSECRET);

  session.token = token;

  let id = user._id;
  //verify is this token already exist

  session.save(function (err) {
    if (err) {
      res.status(422);
      console.log('error while saving the session', err);
      res.json({
        error: 'There was an error saving the session'
      });
    }
    //Session Created Succefully
    res.status(201).json({ token, id });
  });


});

module.exports = router;