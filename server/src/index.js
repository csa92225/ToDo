const express = require("express");
const app = express();
const bodyparser = require('body-parser')
const router = require('./routes/router')

//middleware
app.use(bodyparser.urlencoded({ extended: true }))
app.use(express.json())
app.use("/", router)

const port = process.env.PORT || 4000
app.listen(4000, () => {
  console.log(`server started at port ${port}`);
});

