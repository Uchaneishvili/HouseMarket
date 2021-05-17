const mongoose = require("mongoose");
const homeSchema = new mongoose.Schema({
  image: {
    // data: Buffer,
    // contentType: String,
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  room: {
    type: Number,
    required: true,
  },
  floor: {
    type: String,
    required: true,
  },
  area: {
    type: Number,
  },
  address: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
  },
});

const Homes = mongoose.model("Homes", homeSchema);
module.exports = Homes;
