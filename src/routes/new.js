const express = require('express');

const router = express.Router();


//Create New
router.post('/news', (req, res) => {
    res.send("create new");
});

router.get('/news/:userId', (req, res) => {
    const userId = req.params.userId;
    
    feed.items.forEach(item => {
        console.log(item.title + ':' + item.link + "\n")
    });
});


module.exports = router;
