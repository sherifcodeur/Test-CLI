// all routes for Artist Model
        const express = require('express');
        const router = express.Router();
        const artistController = require('../controllers/ArtistController');
        
        
        
        
        router.get('/', artistController.index)

        router.get('/create', artistController.create)
        
        router.post('/', artistController.store)
        
        router.get('/show/:id',artistController.show)

        router.get('/edit/:id',artistController.edit)
        
        router.put('/update/:id',artistController.update)
        
        router.delete('/delete/:id',artistController.destroy)
        
        // router.get('/search',artistController.search)
        
        module.exports = router ; 