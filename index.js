// http://localhost:81/data?query={} query*****


const express = require("express");
// const { MongoClient, CURSOR_FLAGS } = require("mongodb");
const mongoose = require("mongoose");

// Replace the uri string with your connection string.
mongoose.connect(
  "mongodb+srv://Blackcoffer:Black2010@dashboard.gm2mtrv.mongodb.net/Blackcoffer?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    // useFindAndModify: false,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

// Initialize app
const app = express();
var cors = require("cors");

app.use(cors());
// Mongoose connection
// Route for home

const User = require("./User");
app.get("/data", async function (req, res) {
  try {
    console.log(req.query.query);
    const userData = await User.find(JSON.parse(req.query.query)).exec();
    res.send(userData);
  } catch (e) {
    res.send([]);
  }
});

// Start server with port 3000
app.listen(81, function () {
  console.log("Server started on localhost:81");
});
