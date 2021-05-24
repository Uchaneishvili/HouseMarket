const mongoose = require("mongoose");
const homeSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  typeCard: {
    type: String,
    required: true,
  },
  image: {
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
    type: Number,
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
  price: {
    type: Number,
    // required: true,
  },
});

const Homes = mongoose.model("Homes", homeSchema);
module.exports = Homes;
