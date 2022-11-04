const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const configRoutes = require("./routes");
const app = express();
require('dotenv').config();

const mongoString = process.env.DATABASE_URL
mongoose.connect(mongoString);
const database = mongoose.connection
database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan('tiny'))
configRoutes(app);
// app.use('/api', routes)
app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})