const express = require("express");
const app = express();
const bodyparser = require('body-parser')
const router = require('./routes/router')
const cors = require("cors")

//middleware
app.use(bodyparser.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.use("/", router)

const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log(`server started at port ${port}`);
});

