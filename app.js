const express = require('express');
const connectDB = require('./config/db');

const app = express();

connectDB();

app.get('/',(req,res) => res.send('Hello World!'));

const port = process.env.port|| 8082;

app.listen(port, () => console.log(`Server is running on ${port}`));