const express = require("express");
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json();
var path = require('path');
global.appDir =  path.resolve(__dirname);
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
// parse application/json
app.use(bodyParser.json())
app.use(express.static('../kartik'))
// D:\my\kartik LAW\kl\kartik\dist\kartik
const port = 3001;

var mongoose = require('mongoose');
var URL = 'mongodb://localhost/kartik'
mongoose.connect(URL, function(err) {
    if(err){
      console.log(err);
    }
});

var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
var corsorigin = {
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
};

// const autoSuggest = require('./assets/autoSuggest.json');
// app.use('/api/authers', require('./api/authers/auther.controller'));
// app.use('/api/books', require('./api/books/book.controller'));
app.use('/api/films', cors(corsorigin), require('./api/films/films.controller'));

// app.post('/search',(req, res)=>{
// //     console.log("==req===>", req);
// //     console.log("==autoSuggest===>", autoSuggest);
//     let data = "data";//autoSuggest.filter(item=>item.name.includes(req.body.text))
//     res.send({
//         data: data,
//         status: "Success"
//     })
// })


app.listen(port, ()=>{console.log("server is runing on "+port)});



const fs = require("fs")

// fs.access("./assets/img/test", function(error) {
    // let dir = './assets/img/test';
    // if (!fs.existsSync(dir)) {
    //     fs.mkdirSync(dir);  
    //     console.log("Directory does not exist.")
    // } else {
        
    //     console.log("Directory exists.")
    // }
// })