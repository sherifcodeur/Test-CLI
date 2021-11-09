
// pour generer le crud faire:    node .\crudgenerators\ArtistCrudGenerator.js

// const { createIndexes } = require('../models/Artist');

const Artist = require('../models/Artist')

const fs = require('fs')

const pluralize = require('pluralize')

const ModelName = "Artist"
const lowerModelName = ModelName.toLowerCase()
const lowerModelNameplural = pluralize(lowerModelName)


const pak = Object.values(Artist.schema.paths) ;


let before = `
<!DOCTYPE html>
<html lang="en">
<head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
</head>
<body>

`

let after = `
</body>
</html>

`




//  function createCrud (nameoffield,type,options){


//         //on doit creer le crud 


//         createIndex()



//         createCreateForm()



//         createShow()



//         createEditForm()

     

// }




// create the create form
function createCreateForm(){


    let theform = ``

    theform += before



           // we loop through each element of the schema
    pak.forEach(element=>{

            
            if(element.options.generator){
    
                    if(element.options.generator.includes("c")){
    
                    // console.log(element.path)
                    // console.log(element.instance)
                    // console.log(element.options.generator)
                    // console.log(element.options.required)
                     console.log(element.options.fieldType) 
                    
                    theform += writeFormTemplate(element.path,element.options.fieldType)       
    
                    }      
    
    
            }
    })

    theform += after


    createDirectory("views").then(res=>{

            console.log("created views")

            createDirectory(`views/${lowerModelNameplural}`).then(res=>{


                     createFile("create.ejs",`views/${lowerModelNameplural}`).then(res=>{


                            fs.writeFile(`views/${lowerModelNameplural}/create.ejs`, theform ,(err)=>{

                                if(err){

                                    console.log(err)

                                }else{

                                    console.log('success created view')
                                }
                            })
                     })
            }).catch(console.log("on est la"))
    });

}

// create the edit form
function  createEditForm(){


        let theform = ``

        theform += before



               // we loop through each element of the schema
        pak.forEach(element=>{

                // if schema field contains generator with i (index inside) we build the index
                if(element.options.generator){
        
                        if(element.options.generator.includes("e")){
        
                        // console.log(element.path)
                        // console.log(element.instance)
                        // console.log(element.options.generator)
                        // console.log(element.options.required)
                         console.log(element.options.fieldType) 
                        
                        theform += writeFormTemplate(element.path,element.options.fieldType)       
        
                        }      
        
        
                }
        })

        theform += after


        createDirectory("views").then(res=>{

                console.log("created views")

                createDirectory(`views/${lowerModelNameplural}`).then(res=>{


                         createFile("edit.ejs",`views/${lowerModelNameplural}`).then(res=>{


                                fs.writeFile(`views/${lowerModelNameplural}/edit.ejs`, theform ,(err)=>{

                                    if(err){

                                        console.log(err)

                                    }else{

                                        console.log('success created view')
                                    }
                                })
                         })
                })
        });

       

        //return theform

}




function writeFormTemplate(nameoffield,fieldType){

        switch (fieldType) {
                case "text":

                        return inputtextfieldtemplate(nameoffield)
                        
                        break;

                case "textarea":
                        return inputtextareafieldtemplate(nameoffield)

                        break;
                
                case "email":

                        return inputemailfieldtemplate(nameoffield)
                            
                        break;

                case "password":

                        return inputpasswordfieldtemplate(nameoffield)
                                
                        break;

        
                default:
                        break;
        }


}

// input text field
function inputtextfieldtemplate(nameoffield) { return `
<div class="form-group">
        <label for="${nameoffield}">${nameoffield}:</label>
        <input type="text" id="${nameoffield}" name="${nameoffield}">
</div>

`}


// input email field
function inputemailfieldtemplate(nameoffield) { return `
<div class="form-group">
        <label for="${nameoffield}">${nameoffield}:</label>
        <input type="email" id="${nameoffield}" name="${nameoffield}">
</div>

`}

// input password field
function inputpasswordfieldtemplate(nameoffield) { return `
<div class="form-group">
        <label for="${nameoffield}">${nameoffield}:</label>
        <input type="password" id="${nameoffield}" name="${nameoffield}">
</div>

`}

// text area field
function inputtextareafieldtemplate(nameoffield) { return `
<div class="form-group">
        <label for="${nameoffield}">${nameoffield}</label>
        <textarea id="${nameoffield}" name="${nameoffield}" rows="4" cols="50">
        </textarea>
</div> 

`}




// create a directory at the root level of the app if it doesnt't exist
function createDirectory(nameOfDirectory){

        return new Promise((resolve, reject) => {
    
            // we check if we can access the directory(if it exists)
            fs.access(nameOfDirectory, (error) => {
    
                // it doesn't exist we create it
                if (error) {
                    fs.mkdir(nameOfDirectory, (err) => {
    
                        if (err) {
    
                            reject(Error("error1"))
    
                        } else {
    
                            resolve("the controllers directory has been created")
                        }
    
                    })
    
                } else {
    
                    resolve("the controller already exist")
                }
            })
    
        })   
}

// create a file in a directory or directly in the root if not specified the directory
function createFile(nameOfFile, nameOfDirectory = null){



        return new Promise((resolve, reject) => {
    
    
    
            // we ask for a directory
            if (nameOfDirectory) {
    
                // on cree dabord le directory
                createDirectory(nameOfDirectory).then(res => {
    
    
                    let path = `${nameOfDirectory}/${nameOfFile}`
                    fs.appendFile(path, '', (err) => {
                        if (err) {
    
                            reject(err)
    
                        } else {
    
                            resolve("added file")
                        }
    
                    })
    
    
                }).catch(err => console.log(err))
    
    
            // we don't need a directory
            } else {
    
                let path = `${nameOfFile}`
    
                fs.appendFile(path, '', (err) => {
    
                    if (err) {
    
                        reject(err)
    
                    } else {
    
                        resolve("added file")
                    }
    
                })
    
    
            }
    
        })
    }









createCreateForm()


createEditForm()