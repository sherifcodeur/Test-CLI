
    // Artist Controller
    // we import the model so we can interact with the database
    const mongoose = require('mongoose');
    
    // importing the Artist model
    const Artist = require('../models/Artist.js');


    let path = '/admin'
    
    
    
    // shows all artist
    const index = (req, res) => {
    
        Artist.find().then((result) => {
    
            //console.log(result);
            res.render('./artists/index', {
    
                allartists: result
            });
        }).catch(err => console.log(err));
    
    
    }
    
    
    // sends to a form to create a artist
    const create = (req, res) => {
    
        res.render('./artists/create');
    
    }
    
    // receive the req from the form to create a artist in the db
    const store = (req, res) => {
    
        // console.log(req.body.name);
        let newArtist = new Artist(req.body);
    
        newArtist.save().then(res.redirect(`${path}/artists`)).catch(err => console.log(err.message));
    
    
    
    
    
    }
    
    // show one artist
    const show = (req, res) => {
    
        let theid = req.params.id;
    
        Artist.findById(theid)
            .then(result => {
    
                res.render('./artists/show', {
                    theartist: result
                });
    
            })
            .catch(err => console.log(err));
    
    }
    
    // show the edit form with old values 
    const edit = (req, res) => {
    
        let theid = req.params.id;
    
        Artist.findById(theid)
            .then(result => {
    
                res.render('./artists/edit', {
                    theartist: result
                });
    
            })
            .catch(err => console.log(err));
    
    }
    
    // take back the values from the edit form and update them in the db
    const update = (req, res) => {
    
        let theid = req.params.id;
    
        //console.log(req.body);
    
        Artist.findByIdAndUpdate(theid, req.body).then(result => {
    
    
            res.redirect(`${path}/artists`);
        }).catch(err => console.log(err));
    
    
    
    }
    
    
    // delete the artist form the database 
    const destroy = (req, res) => {
    
        let theid = req.params.id;
    
        Artist.findByIdAndDelete(theid).then(result => {
    
            
            res.redirect(`${path}/artists`);
        }).catch(err => console.log(err));
    
    
    }
    
    
    module.exports = {
    
        index,
        create,
        store,
        show,
        edit,
        update,
        destroy,
    
    }
    