const express = require('express');

const router = express.Router();

const NewModel = require('../Models/new');

//Create New
router.post('/news', (req, res) => {
    res.send("create new");
});

router.get('/new/:userId', (req, res) => {
    const userId = req.params.userId;

    NewModel.model.find({ user_id: userId }).then(data => {
        res.json(data)
    }).catch(err => console.log(err));


});


module.exports = router;
