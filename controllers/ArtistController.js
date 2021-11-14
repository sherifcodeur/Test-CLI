
    // Artist Controller
    // we import the model so we can interact with the database
    const mongoose = require('mongoose');
    
    // importing the Artist model
    const Artist = require('../models/Artist.js');
    

    // change it with the path to your admin urls
    let path = '/admin'
    


    // shows all artist
    const index = async (req, res) => {


        /// simplest way 
    
        // Artist.find().then((result) => {
    
        //     //console.log(result);
        //     res.render('./artists/index', {
    
        //         allartists: result
        //     });
        // }).catch(err => console.log(err));


        ///////////////




        // pagination with skip limit method no need of plugins--------------------
        try {
    
            // the page size , how many rows we want
            let limit = parseInt(req.query.limit);
            //console.log("la limit",limit)
    
            //how many rows to skip before showing
            let offset = parseInt(req.query.offset);
            //console.log("offset",offset)
    
            if(!offset){           
                offset = 0  }
    
            if(!limit){
                limit = 5
            }
    
            const allartists = await Artist.find()
                                            .skip(offset)
                                            .limit(limit)
            const artistsCount= await Artist.count();
    
            const totalPages = Math.ceil(artistsCount/limit)
            const currentPage = Math.ceil(offset / limit)+1
    

            res.render('./artists/index', {
        
                allartists: allartists,
                paging:{
                   total:artistsCount,
                   page:currentPage,
                   pages:totalPages
               }

           });    

        } catch (error) {
            console.log("error",error)
            res.status(500).send({data:null})        
        }
    
        // // end of pagination with skip limit--------------------------


    
    
    
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
    