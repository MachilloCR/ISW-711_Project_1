const express = require('express');
const router = express.Router();
//Rss feed parser
let Parser = require('rss-parser');
let parser = new Parser();

const NewModel = require('../Models/new');

const NewSourceModel = require('../Models/newsource');

//saves the news on the database
router.post('/newsource/:id/process', async (req, res) => {
    try {
        const id = req.params.id;
        await NewModel.model.deleteMany({ news_source_id: id });
        //search a newsource id that matches whit the id provided
        const newSourceResult = await NewSourceModel.model.findOne({ user_id: id });
        if (!newSourceResult) {
            return res.status(404).send('New Source Not found');
        }

        // obtain the new source url
        const url = newSourceResult.url;
        const newsList = [];

        let feed = await parser.parseURL(url);

        feed.items.forEach(async item => {
            const New = new NewModel.model({
                title: item.title,
                short_description: item.contentSnippet,
                permalink: item.link,
                date: item.pubDate,
                news_source_id: newSourceResult._id,
                user_id: newSourceResult.user_id,
                category_id: newSourceResult.category_id
            });
            const saveNew = await New.save();
            newsList.push(saveNew);
            console.log(saveNew);
        });

        res.status(201).json(newsList);

    } catch (err) {
        console.log('Error al realizar la consulta:', err);
        res.status(500).send('Error al realizar la consulta');
    }


});

router.get('/newsource/:id', async (req, res) => {
    if (req.params.id) {
        const id = req.params.id;
        //search a newsource id that matches whit the id provided
        const newSourceResult = await NewSourceModel.model.find({ user_id: id ,});
        res.status(201).json(newSourceResult);
    } else {
        res.status(404);
        res.json({ error: "Source doesnt exist" });
    }


});
//Get source
router.get('/newsource', (req, res) => {
    if (req.query && req.query.id) {

        NewSourceModel.model.findById(req.query.id, function (err, Source) {
            if (err) {
                res.status(404);
                console.log('error while queryting the Source', err);
                res.json({ error: "Source doesnt exist" });
            }
            res.status(200); // OK
            res.json(Source);
        });
    } else {
        res.status(404);
        res.json({ error: "Source doesnt exist" });
    }


});

//Create source
router.post('/newsource', (req, res) => {

    const source = new NewSourceModel.model;

    source.url = req.body.url;
    source.name = req.body.name;
    source.category_id = req.body.category_id;
    source.user_id = req.body.user_id;

    //Verify empty spaces
    if (source.url && source.name && source.category_id && source.user_id) {
        //if not empty spaces
        source.save(function (err) {
            if (err) {
                res.status(422);
                console.log('xd error while saving the Source', err);
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
router.put('/newsource', (req, res) => {

    //   check if there's an ID in the querystring
    if (req.query && req.query.id) {

        NewSourceModel.model.findById(req.query.id, function (err, source) {
            if (err) {
                res.status(404);
                console.log('error while queryting the Source', err);
                res.json({ error: "Source doesnt exist." });
            }
            // Update the User
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
router.delete('/newsource', (req, res) => {

    // check if there's an ID in the querystring

    if (req.query && req.query.id) {

        NewSourceModel.model.findById(req.query.id, function (err, source) {
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