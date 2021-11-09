
    // Artist Model


    //importing external dependencies
    const mongoose = require('mongoose');

    //for cursor pagination
    //const MongoPaging = require('mongo-cursor-pagination');

    // for using unique validator (example unique email)
    //const uniqueValidator = require('mongoose-unique-validator');



    // creating Artist Schema (generator = index create show edit i c s e)
    // fieldType options = text textarea email password select
    const Schema = mongoose.Schema;
    const artistSchema = new Schema({

       
            
            name : {
                type:String,
                required:[true,'required field'] , 
                generator:"i c s e",
                fieldType:"text",

            },
            
            
            
            description : {
                type:String,
                generator:"i c s e",
                fieldType:"textarea"
                       
            },
            
            
    
    },     
        // Make Mongoose use Unix time (seconds since Jan 1, 1970)
        { timestamps: true }
    );


    // this will add cursor paginate function.
    // artistSchema.plugin(MongoPaging.mongoosePlugin);

    // for unique validation such as email
    // artistSchema.plugin(uniqueValidator);



    // creating model Artist based on the artist schema
    const Artist = mongoose.model('artist',artistSchema);



    //exporting the model Artist
    module.exports =  Artist ;