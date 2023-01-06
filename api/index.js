const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const multer = require('multer');
const path = require('path');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');
const categoryRoute = require('./routes/categories');
const postRoute = require('./routes/posts');

const app = express();

// loads environment variables from our .env file into process.env
dotenv.config();

// so we can post json to our endpoints
app.use(express.json());

// open a connection to the blog database on our locally running instance of MongoDB
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log('Connected to MongoDB'))
  .catch((err) => console.log(err.message));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, req.body.filename);
  },
});

const upload = multer({ storage: storage });
app.post('/api/upload', upload.single('file'), (req, res) => {
  res.status(200).json('File uploaded successfully');
});

// add all routes and their handler functions
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/categories', categoryRoute);
app.use('/api/posts', postRoute);

// set up the port we need to listen to
app.listen('5001', () => {
  console.log('Web Server is available at http://localhost:5001/');
});
