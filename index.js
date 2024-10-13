const dotenv = require('dotenv'); 
const express = require('express');
const app = express();

const  mongoose  = require('mongoose');


dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
// const DB = process.env.DATABASE_LOCAL;

mongoose.connect(DB,{
  userNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(con => {
  console.log(con.connections);
  console.log('DB connection successful!');
});  

const nodejs = new mongoose.Schema({
  name: {
    type:String,
    required: [true, 'A tour must have a name'],
    unique: true,
  },
  rating:{
    type:Number,
    default: 4.5
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price']
  } 
});
const nodejsTour = mongoose.model('nodejsTour', nodejs);

const testNodejs = new nodejsTour({
  name: 'The Forest Hiker is inserted ps',
  rating: 4.7,
  price: 497
});

testNodejs.save().then(doc => {
  console.log(doc);
}).catch  (err => {
  console.log('Error', err);
})  


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
