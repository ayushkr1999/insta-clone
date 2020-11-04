const mongoose = require('mongoose');
// const config= require('config')
// const db = config.get('mongoURI')
const db =
  'mongodb+srv://ayush:ayush@123@cluster0.jr1kd.mongodb.net/instaclone?retryWrites=true&w=majority';
  
const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log(db);
    console.log(`mongodb conceted `);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
module.exports = connectDB;
