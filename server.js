require("dotenv").config({path: "./config.env"});
const express = require('express');
const connectDB = require('./config/db');
var cors = require('cors');
const path = require('path')

// routes
const books = require('./routes/api/books');

const app = express();

// Connect Database
connectDB();

// cors
app.use(cors({ origin: true, credentials: true }));

// Init Middleware
app.use(express.json({ extended: false }));

//app.get('/', (req, res) => res.send('Api running!'));

// use Routes
app.use('/api/books', books);

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,'/client/build')))

    app.get('*',(req,res) =>{
        res.sendFile(path.join(__dirname,'client','build','index.html'))
    })
} else {
    app.get('/',(req,res) =>{
        res.send("Api running");
    });
}

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));
