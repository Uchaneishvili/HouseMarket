const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();

app.listen(3001, () => {
  console.log("running on the port 3001");
});
