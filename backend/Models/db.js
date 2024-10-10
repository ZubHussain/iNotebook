const mongoose = require('mongoose');
require('dotenv').config()

const url = process.env.REACT_APP_PASSWORD;

mongoose.connect(url)
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err))

