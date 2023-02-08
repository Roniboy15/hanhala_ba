const mongoose = require('mongoose');
const {config} = require('../config/secret')

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(`mongodb+srv://${config.userDB}:${config.userPass}@cluster0.qi5tkfy.mongodb.net/hanhala`);
  console.log("mongo connected to hanhala atlas");
  
  // use `await mongoose.connect('mongodb://user:password@localhost:27017/idf7');` if your database has auth enabled
}