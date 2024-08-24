const express = require('express');
const dotenv = require('dotenv')
const mongoose = require('mongoose');
const productRoutes = require('./routes/productRoutes')
const userRoutes = require('./routes/userRoutes')
const cors = require('cors')
const jwt = require('jsonwebtoken');

const app = express();

app.use(cors())

dotenv.config()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/products', productRoutes)
app.use('/auth', userRoutes)

mongoose.connect(`${process.env.MONGO_URL}`);

app.listen(3000, () => {
  console.log('Server started on port 3000');
});