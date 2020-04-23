const mongoose = require("mongoose");

mongoose
  .connect(
    // "mongodb+srv://marioDev:th3R0ck46312@cluster0-xcn4e.mongodb.net/bartman?retryWrites=true&w=majority",
    "mongodb://localhost:27017/bartman?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .catch(e => {
    console.error("Connection error", e.message);
  });

const db = mongoose.connection;

module.exports = db;
