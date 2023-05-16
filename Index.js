const express = require('express');
const bodyParser = require('body-parser');
const { response } = require('express');
const { db } = require('./database.js');


const app = express();
const PORT = 9900;
let k;



db.query(`SELECT * FROM user_details`, (err, res)=>{
    console.log("Connected from index.js");
    return console.log(res);
})

app.listen(PORT, ()=> console.log(`Server started on ${PORT}`));

//This middleware will interact with all incoming requests

app.use(express.urlencoded());


app.post('/handle_data', (request, response, next)=>{
    console.log("URL: ", express.urlencoded())
    console.log(request.body);
    // response.send(request.body);
    k = request.body;
    console.log("K: ", k.username); //This gets the username from json file by accessing key/index. Accessing key/index gets the value in this case user input. 
// res.send("HEY"); Sends hey to the body. 

        //the final part after where needs to be column. 
    db.query("SELECT email FROM user_details WHERE email= ?", [k.username], (err, res, next)=>{
        console.log("error logged: ", err);
        console.log("res: ", res);
        if (res == 0){
            console.log("ERROR LOGIN NOT FOUND.");
            
             
        }   
        else{
            console.log("Successful login was found.")
            response.writeHead(301, {
                Location: `http://localhost:5500/test.html`
              }).end();
        }
    });
}); 

//Get database, query database, and check if "k.username" is in the database username column. If it is redirect  import { colorCode } from './first.js'
