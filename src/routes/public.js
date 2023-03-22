const express = require('express');

const router = express.Router();
const CategoryModel = require('../Models/category');

router.get('/publicCat', (req, res) => {
    CategoryModel.model.find().then(data => {
        res.json(data)
    }).catch(err => console.log(err));
});




module.exports = router;