const dotenv = require('dotenv'); 
const app = require('./app');
const  mongoose  = require('mongoose');
const fs = require('fs');
const Tour = require('./model/toutModel');


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

// READ FILE 
const tours = fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8');

// IMPOERT DATA INTO MONGO DB
const ImportData = async () => {
  try{
    await Tour.create(JSON.parse(tours));
    console.log('Data successfully loaded!');
  }catch(err){
    console.log(err);
  }
};

// Delete All Data

const deleteData = async () => {
  try{
    await Tour.deleteMany();
    console.log('Data successfully deleted!');
  }catch(err){
    console.log(err);
  }
};
console.log(process.argv);