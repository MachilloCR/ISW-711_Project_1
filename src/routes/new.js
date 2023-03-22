const express = require('express');

const router = express.Router();

const NewModel = require('../Models/new');


// Get the news that matchets whit the user id
router.get('/new/:userId', (req, res) => {
    const userId = req.params.userId;

    NewModel.model.find({ user_id: userId }).then(data => {
        res.json(data)
    }).catch(err => console.log(err));


});
//filter the news by category
router.get('/new/:userId/:categoryId', (req, res) => {
    const userId = req.params.userId;
    const categoryId = req.params.categoryId;

    NewModel.model.find({ user_id: userId, category_id: categoryId }).then(data => {
        res.json(data)
    }).catch(err => console.log(err));


});

module.exports = router;
