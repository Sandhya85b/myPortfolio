const mongoose = require("mongoose");

const connectToDb = () => {
  try {
    mongoose.connect("mongodb://127.0.0.1:27017/mydb");
    console.log("Connected to db");
  } catch (err) {
    console.log("Failed connecting to db");
  }
};

module.exports = connectToDb;
