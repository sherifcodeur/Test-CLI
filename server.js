
    // importing dependencies
    const express = require('express');
    const dotenv = require('dotenv').config();
    

    const dbconnect = require('./database/connection');
    
    //importing routes - example company routes -
    const artistRoutes = require('./routes/Artist');
    
    // PORT defined in the env file
    const PORT = process.env.PORT || 3000;
    
    
    // initializing express application
    const app = express();


    app.set('view engine','ejs')
    
      // connect to the database
      dbconnect;
    
    
    
    // Request payload middleware
    app.use(express.static('public'));
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    
    
    // Handle custom routes - add the custom routes
    // app.use('/api/v1/user', require('./routes/userRoutes'))
    app.use('/admin/artists',artistRoutes);
    
    
    // checks if server is working
    // app.get('/', (req, res, next) => {
    //   res.send('Hello from my Express server v2!')
    // })
    

    // app listens on the selected Port
      app.listen(PORT, () => {
        console.log("Server listening ")
      })
    