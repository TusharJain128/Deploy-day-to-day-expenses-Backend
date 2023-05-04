const express = require("express");
const mongoose = require("mongoose");
const dotenv = require('dotenv')
const route = require("./routes/route")
const cors = require('cors');

const app = express();
app.use(express.json())
app.use(cors())
dotenv.config()

mongoose.set('strictQuery', true)
mongoose.connect(process.env.MY_DB_URL)
  .then(() => { console.log("mongodb is connected now") })
  .catch((err) => console.log(err))

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.use("/", route)

app.listen(process.env.PORT,
  () => console.log(`Server started on port ${process.env.PORT}`)
);
