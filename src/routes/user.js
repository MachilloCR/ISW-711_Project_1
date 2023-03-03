const express = require ('express');

const router = express.Router();

const UserModel = require('../Models/User');

//Create New
router.post('/user', (req, res) =>{
    
    const user = new UserModel.model;

    user.first_name = req.body.first_name;
    user.last_name = req.body.last_name;
    user.email = req.body.email;
    user.role_id = req.body.role_id;

    //Verify empty spaces
    if (user.first_name && user.last_name && user.email && user.role_id)  {
        //if not empty spaces
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
                'location': `http://localhost:3000/user/?id=${user.id}`
            });
            res.json(user);
        });
    } else {
        res.status(422);
        console.log('error while saving the User')
        res.json({
            error: 'No valid data provided for User'
        });
    }
});
//Get User
router.get('/user', (req, res) => {
    //   check if there's an ID in the querystring
    if (req.query && req.query.id) {

        UserModel.model.findById(req.query.id, function (err, user) {
            if (err) {
                res.status(404);
                console.log('error while queryting the User', err);
                res.json({ error: "User doesnt exist" });
            }
            res.status(200); // OK
            res.json(user);
        });
    } else {
        res.status(404);
        res.json({ error: "User doesnt exist" });
    }
});
//Edit User
router.patch('/user/edit', (req, res) => {

    //   check if there's an ID in the querystring
    if (req.query && req.query.id) {

        UserModel.model.findById(req.query.id, function (err, user) {
            if (err) {
                res.status(404);
                console.log('error while queryting the User', err);
                res.json({ error: "User doesnt exist." });
            }
            // Update the User
            user.first_name = req.body.first_name ? req.body.first_name : user.first_name;
            user.last_name = req.body.last_name ? req.body.last_name: user.last_name;
            user.email = req.body.email ? req.body.email: user.email ;
            user.role_id = req.body.role_id ? req.body.role_id: user.role_id;

            user.save(function (err) {
                if (err) {
                    res.status(422);
                    console.log('error while saving the User', err);
                    res.json({
                        error: 'There was an error saving the User'
                    });
                }
                res.status(200); // OK
                res.json(user);
            });
        });
    } else {
        res.status(404);
        res.json({ error: "User doesnt exist" });
    }

});
//Delete User
router.delete('/user/delete', (req, res) => {

    // check if there's an ID in the querystring

    if (req.query && req.query.id) {

        UserModel.model.findById(req.query.id, function (err, user) {
            if (err) {
                res.status(404);
                console.log('error while queryting the User', err);
                res.json({ error: "User doesnt exist" });
            }
            user.delete(function (err) {
                if (err) {
                    res.status(422);
                    console.log('error while saving the User', err);
                    res.json({
                        error: 'There was an error saving the User'
                    });
                }
                res.status(200); // OK
                res.json(user);
            });
        });
    } else {
        res.status(404);
        res.json({ error: "User doesnt exist" });
    }

});

module.exports = router;