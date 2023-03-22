const express = require('express');

const router = express.Router();
const CategoryModel = require('../Models/category');

//Get category
router.get('/category', (req, res) => {
    //   check if there's an ID in the querystring
    if (req.query && req.query.id) {

        CategoryModel.model.findById(req.query.id, function (err, category) {
            if (err) {
                res.status(404);
                console.log('error while queryting the category', err);
                res.json({ error: "category doesnt exist" });
            }
            res.status(200); // OK
            res.json(category);
        });
    } else {
        res.status(404);
        res.json({ error: "category doesnt exist" });
    }
});
//Create category
router.post('/category', async (req, res) => {

    const category = new CategoryModel.model;

    category.name = req.body.name;

    //Verify empty spaces
    if (category.name) {
        //if not empty spaces
        const catExists = await CategoryModel.model.findOne({ name: category.name });
        if (!catExists) {
            category.save(function (err) {
                if (err) {
                    res.status(422);
                    console.log('error while saving the category', err);
                    res.json({
                        error: 'There was an error saving the category'
                    });
                }
                //User Created Succefully
                res.status(201);
                res.header({
                    'location': `http://localhost:8000/api/category/?id=${category.id}`
                });
                res.json(category);
            });
        } else {
            res.status(422);
            console.log('error while saving the category')
            res.json({
                error: 'This Category Already Exists'
            });
        }
    } else {
        res.status(422);
        console.log('error while saving the category')
        res.json({
            error: 'No valid data provided for category'
        });
    }
});
//Edit category
router.put('/category', (req, res) => {

    //   check if there's an ID in the querystring
    if (req.query && req.query.id) {

        CategoryModel.model.findById(req.query.id, function (err, category) {
            if (err) {
                res.status(404);
                console.log('error while queryting the category', err);
                res.json({ error: "category doesnt exist." });
            }
            // Update the User
            category.name = req.body.name ? req.body.name : category.name;

            category.save(function (err) {
                if (err) {
                    res.status(422);
                    console.log('error while saving the category', err);
                    res.json({
                        error: 'There was an error saving the category'
                    });
                }
                res.status(200); // OK
                res.json(category);
            });
        });
    } else {
        res.status(404);
        res.json({ error: "category doesnt exist" });
    }

});
//Delete category
router.delete('/category', (req, res) => {

    // check if there's an ID in the querystring

    if (req.query && req.query.id) {

        CategoryModel.model.findById(req.query.id, function (err, category) {
            if (err) {
                res.status(404);
                console.log('error while queryting the category', err);
                res.json({ error: "category doesnt exist" });
            }
            category.delete(function (err) {
                if (err) {
                    res.status(422);
                    console.log('error while saving the category', err);
                    res.json({
                        error: 'There was an error saving the category'
                    });
                }
                res.status(200); // OK
                res.json(category);
            });
        });
    } else {
        res.status(404);
        res.json({ error: "category doesnt exist" });
    }

});

module.exports = router;