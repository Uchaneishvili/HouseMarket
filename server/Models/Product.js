const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
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
    type: String,
  },

  address: {
    type: String,
  },
  desc: {
    type: String,
  },
  price: {
    type: String,
    // required: true,
  },
  no: {
    type: Number,
    required: true,
  },
});

const product = mongoose.model("Products", productSchema);
module.exports = product;
