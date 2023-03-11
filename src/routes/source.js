const express = require('express');
const router = express.Router();
//Rss feed parser
let Parser = require('rss-parser');
let parser = new Parser();

const SourceModel = require('../Models/source');

//Get source
router.get('/sources', (req, res) => {

    (async () => {

        let feed = await parser.parseURL('https://feeds.feedburner.com/NacionalesCrhoycomPeriodicoDigitalCostaRicaNoticias');
        console.log(feed.title);

        feed.items.forEach(item => {
            console.log(item.title + ':' + item.link + "\n")
        });

    })();

});

//Create source
router.post('/source', (req, res) => {

    const source = new SourceModel.model;

    source.id = req.body.id;
    source.url = req.body.url;
    source.name = req.body.name;
    source.category_id = req.body.category_id;
    source.user_id = req.body.user_id;

    //Verify empty spaces
    if (source.id && source.url && source.name && source.category_id && source.user_id) {
        //if not empty spaces
        source.save(function (err) {
            if (err) {
                res.status(422);
                console.log('error while saving the Source', err);
                res.json({
                    error: 'There was an error saving the Source'
                });
            }
            //User Created Succefully
            res.status(201);
            res.header({
                'location': `http://localhost:8000/source/?id=${source.id}`
            });
            res.json(source);
        });
    } else {
        res.status(422);
        console.log('error while saving the Source')
        res.json({
            error: 'No valid data provided for Source'
        });
    }
});


//Edit source
router.put('/source', (req, res) => {

    //   check if there's an ID in the querystring
    if (req.query && req.query.id) {

        SourceModel.model.findById(req.query.id, function (err, source) {
            if (err) {
                res.status(404);
                console.log('error while queryting the Source', err);
                res.json({ error: "Source doesnt exist." });
            }
            // Update the User
            source.id = req.body.id ? req.body.id : source.id;
            source.url = req.body.url ? req.body.url : source.url;
            source.name = req.body.name ? req.body.name : source.name;
            source.category_id = req.body.category_id ? req.body.category_id : source.category_id;
            source.user_id = req.body.user_id ? req.body.user_id : source.user_id;

            source.save(function (err) {
                if (err) {
                    res.status(422);
                    console.log('error while saving the source', err);
                    res.json({
                        error: 'There was an error saving the source'
                    });
                }
                res.status(200); // OK
                res.json(source);
            });
        });
    } else {
        res.status(404);
        res.json({ error: "Source doesnt exist" });
    }

});
//Delete source
router.delete('/source', (req, res) => {

    // check if there's an ID in the querystring

    if (req.query && req.query.id) {

        SourceModel.model.findById(req.query.id, function (err, source) {
            if (err) {
                res.status(404);
                console.log('error while queryting the Source', err);
                res.json({ error: "Source doesnt exist" });
            }
            source.delete(function (err) {
                if (err) {
                    res.status(422);
                    console.log('error while saving the Source', err);
                    res.json({
                        error: 'There was an error saving the Source'
                    });
                }
                res.status(200); // OK
                res.json(source);
            });
        });
    } else {
        res.status(404);
        res.json({ error: "Source doesnt exist" });
    }

});

module.exports = router;