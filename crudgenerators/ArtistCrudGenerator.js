
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

const beginformcard = function(formtag){

        return  `
        <div class="card card-primary">
                <div class="card-header">
                        <h3 class="card-title">Quick Example</h3>
                </div>

                ${formtag}
                <div class="card-body">

`

}

let endformcard = `

                </div>
                <!-- /.card-body -->

                <div class="card-footer">
                        <button type="submit" class="btn btn-primary">Submit</button>
                </div>
                </form>

`

let after = `

        </div>
</body>
</html>

`



//we create table th
function createTableth(){
        let tableths = `<tr>`        

        pak.forEach(element=>{

                if(element.options.generator){

                        if(element.options.generator.includes("i")){


                                tableths += `<th rowspan="1" colspan="1">${element.path}</th>`       
                        }

                }
        })
        tableths += `</tr>`
        return tableths

}





// we create the td for the index
function createTabletd(){

        let tabletds = ``

        tabletds += `<% all${lowerModelNameplural}.forEach(${lowerModelName}=>{ %>`

        tabletds += '<tr>'

        pak.forEach(element=>{
                
                console.log("element",element)

                if(element.options.generator){

                        if(element.options.generator.includes("i")){


                                tabletds +=`<td><%= ${lowerModelName}.${element.path} %></td>`       
                        }

                }
        })

        tabletds += `</tr>`

        tabletds += `<% }) %>`

        

  return tabletds

}



 async function createCrud (){


        //on doit creer les directory
        await  createDirectory('views').then(console.log("created views")).catch(err=>console.log("error in creating views"))
        await  createDirectory(`views/${lowerModelNameplural}`).then(console.log("created views folder artists")).catch(err=>console.log("error in creating views"))


        createIndexTable()



        createCreateForm()



        //createShow()



        createEditForm()

     

}


// we create index table with pagination and buttons show edit and delete
function createIndexTable(){

        let indexpage = ``
        indexpage += before

        indexpage += `<div class="card">
        <div class="card-header">
          <h3 class="card-title">DataTable with minimal features &amp; hover style</h3>
        </div>
        <!-- /.card-header -->
        <div class="card-body">
          <div id="example2_wrapper" class="dataTables_wrapper dt-bootstrap4"><div class="row"><div class="col-sm-12 col-md-6"></div><div class="col-sm-12 col-md-6"></div></div><div class="row"><div class="col-sm-12"><table id="example2" class="table table-bordered table-hover dataTable dtr-inline" role="grid" aria-describedby="example2_info">
            <thead>
            ${createTableth()}
            </thead>
            <tbody>
          
            ${createTabletd()}
            </tbody>
            <tfoot>
            <tr>${createTableth()}</tr>
            </tfoot>
          </table></div></div><div class="row"><div class="col-sm-12 col-md-5"><div class="dataTables_info" id="example2_info" role="status" aria-live="polite">Showing 1 to 10 of 57 entries</div></div><div class="col-sm-12 col-md-7"><div class="dataTables_paginate paging_simple_numbers" id="example2_paginate"><ul class="pagination"><li class="paginate_button page-item previous disabled" id="example2_previous"><a href="#" aria-controls="example2" data-dt-idx="0" tabindex="0" class="page-link">Previous</a></li><li class="paginate_button page-item active"><a href="#" aria-controls="example2" data-dt-idx="1" tabindex="0" class="page-link">1</a></li><li class="paginate_button page-item "><a href="#" aria-controls="example2" data-dt-idx="2" tabindex="0" class="page-link">2</a></li><li class="paginate_button page-item "><a href="#" aria-controls="example2" data-dt-idx="3" tabindex="0" class="page-link">3</a></li><li class="paginate_button page-item "><a href="#" aria-controls="example2" data-dt-idx="4" tabindex="0" class="page-link">4</a></li><li class="paginate_button page-item "><a href="#" aria-controls="example2" data-dt-idx="5" tabindex="0" class="page-link">5</a></li><li class="paginate_button page-item "><a href="#" aria-controls="example2" data-dt-idx="6" tabindex="0" class="page-link">6</a></li><li class="paginate_button page-item next" id="example2_next"><a href="#" aria-controls="example2" data-dt-idx="7" tabindex="0" class="page-link">Next</a></li></ul></div></div></div></div>
        </div>
        <!-- /.card-body -->
        </div>`

      indexpage += after



      fs.writeFile(`views/${lowerModelNameplural}/index.ejs`, indexpage ,(err)=>{

        if(err){

            console.log(err)

        }else{

            console.log('success created index view')
        }
  


});




}


// create the create form
function createCreateForm(){


    let theform = ``

    theform += before
    theform += beginformcard(`<form action="/admin/${lowerModelNameplural}" method="POST">`)



           // we loop through each element of the schema
    pak.forEach(element=>{

            
            if(element.options.generator){
    
                    if(element.options.generator.includes("c")){
    
                    // console.log(element.path)
                    // console.log(element.instance)
                    // console.log(element.options.generator)
                    // console.log(element.options.required)
                     //console.log(element.options.fieldType) 
                    
                    theform += writeFormTemplate(element.path,element.options.fieldType)       
    
                    }      
    
    
            }
    })
    theform += endformcard
    theform += after


   

            console.log("created views")

 

                            fs.writeFile(`views/${lowerModelNameplural}/create.ejs`, theform ,(err)=>{

                                if(err){

                                    console.log(err)

                                }else{

                                    console.log('success created view')
                                }
                          
                    
           
    });

}

// create the edit form
function  createEditForm(){

  

        let theform = ``

        theform += before
        theform += beginformcard(`<form action="/admin/${lowerModelNameplural}/<%= theproduct.id %>?_method=PUT" method="POST">`)



               // we loop through each element of the schema
        pak.forEach(element=>{

                // if schema field contains generator with i (index inside) we build the index
                if(element.options.generator){
        
                        if(element.options.generator.includes("e")){
        
                        // console.log(element.path)
                        // console.log(element.instance)
                        // console.log(element.options.generator)
                        // console.log(element.options.required)
                        // console.log(element.options.fieldType) 
                        
                        theform += writeFormTemplate(element.path,element.options.fieldType)       
        
                        }      
        
        
                }
        })

        theform += after


                                fs.writeFile(`views/${lowerModelNameplural}/edit.ejs`, theform ,(err)=>{

                                    if(err){

                                        console.log(err)

                                    }else{

                                        console.log('success created view')
                                    }
                               
                         
                
        });

       

        //return theform

}



// choose the right field form to add 
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



// all the form fields types*****************************************

// input text field
function inputtextfieldtemplate(nameoffield) { return `
                        <div class="form-group">
                                <label for="${nameoffield}">${nameoffield}:</label>
                                <input type="text" class="form-control" id="${nameoffield}" name="${nameoffield}">
                        </div>

`}


// input email field
function inputemailfieldtemplate(nameoffield) { return `
                        <div class="form-group">
                                <label for="${nameoffield}">${nameoffield}:</label>
                                <input type="email" class="form-control" id="${nameoffield}" name="${nameoffield}">
                        </div>

`}

// input password field
function inputpasswordfieldtemplate(nameoffield) { return `
                        <div class="form-group">
                                <label for="${nameoffield}">${nameoffield}:</label>
                                <input type="password" class="form-control" id="${nameoffield}" name="${nameoffield}">
                        </div>

`}

// text area field
function inputtextareafieldtemplate(nameoffield) { return `
                        <div class="form-group">
                                <label for="${nameoffield}">${nameoffield}</label>
                                <textarea id="${nameoffield}" class="form-control" name="${nameoffield}" rows="4" cols="50"></textarea>
                        </div> 

`}


// end of all field forms**************************************************




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









createCrud()