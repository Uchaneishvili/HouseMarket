const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();
const homeModel = require("./Models/Home.js");
let swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

app.use(express.json());
app.use(cors());

let swaggerOptions = {
  swagger: "2.0",

  info: {
    title: "Home API",
    description: "Home API information",
    contact: {
      name: "Giga Uchaneishvili",
    },
    servers: ["http://localhost:3001"],
  },
  // ['.routes/*js]
  apis: ["index.js"],
};

const swaggerDocs = (swaggerJsDoc = swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

mongoose.connect(
  "mongodb+srv://guchaneishvili:Gig@20003030@homemarket.toxjt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }
);

//Routes

/**
 * @swagger
 * /homelist:
 *  get:
 *    description: Use to request all advertisements
 *    responses:
 *      '200':
 *        description: A successfull response
 *
 */
app.get("/homelist", async (req, res) => {
  await homeModel.find({}, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
});

app.listen(3001, () => {
  console.log("running on the port 3001");
});
