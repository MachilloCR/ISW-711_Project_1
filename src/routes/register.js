const express = require('express');

const router = express.Router();

const UserModel = require('../Models/user');

//Create New
router.post('/user', async (req, res) => {

    const user = new UserModel.model;

    user.first_name = req.body.first_name;
    user.last_name = req.body.last_name;
    user.email = req.body.email;
    user.password = req.body.password;
    user.role_id = req.body.role_id;

    //Verify empty spaces
    if (user.first_name && user.last_name && user.email && user.role_id) {
        // const salt = await bcrypt.genSalt();
        // const hashedPassword = await bcrypt.hash(password, salt);
        //if not empty spaces
        const userExists = await UserModel.model.findOne({ email: user.email });
        if (!userExists) {
            user.save(function (err) {
                if (err) {
                    res.status(422);
                    console.log('error while saving the User', err);
                    res.json({
                        error: 'There was an error saving the User'
                    });
                }
                //User Created Succefully
                res.status(201);
                res.header({
                    'location': `http://localhost:8000/api/user/?id=${user.id}`
                });
                res.json(user);
            });
        } else {
            res.status(422);
            console.log('error while saving the User')
            res.json({
                error: 'This User already Exists'
            });
        }

    } else {
        res.status(422);
        console.log('error while saving the User')
        res.json({
            error: 'No valid data provided for User'
        });
    }
});




module.exports = router;
