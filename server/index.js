const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();
const homeModel = require("./Models/Home.js");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://guchaneishvili:Gig@20003030@homemarket.toxjt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }
);

const swaggerOption = {
  swagger: "2.0",
  swaggerDefinition: {
    info: {
      title: "Home API",
      description: "Home API information",
      contact: {
        name: "Giga Uchaneishvili",
      },
      servers: ["http://localhost:3001"],
    },
  },

  // ['.routes/*js]
  apis: ["index.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOption);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//Routes

/**
 * @swagger
 *  definitions:
 *    Home:
 *        type: object
 *        required:
 *        - image
 *        - name
 *        - room
 *        properties:
 *          image:
 *            type: string
 *          name:
 *            type: string
 *            example: "for sale"
 *          room:
 *            type: integer
 *            format: int64
 *            example: 4
 */

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
app.get("/homelist", async (res) => {
  await homeModel.find({}, (result) => {
    res.status(200).send(result);
  });
});

/**
 * @swagger
 * /addhome:
 *  post:
 *    description: add new record
 *    consumes:
      - "application/json"
      - "application/xml"
       produces:
      - "application/json"
      - "application/xml"
 *    parameters:
 *      - in: body
 *        name: body
 *        requestBody:
 *            application/json:
 *            schema:
 *              $ref: '#/definitions/Home'
 *    responses:
 *      '200':
 *        description: A successfull response
 *
 */
app.post("/addhome", async (req, res) => {
  // const { image, name, room, floor, area, address, desc } = req.body;

  // const homes = new homeModel({
  //   image: image,
  //   name: name,
  //   room: room,
  //   floor: floor,
  //   area: area,
  //   address: address,
  //   desc: desc,
  // });

  // res.status(200).send(await homes.save(), "inserted data");

  res.send("create");
});

/**
 * @swagger
 * /delete:id:
 *  delete:
 *    description: Delete Record
 *    responses:
 *      '200':
 *        description: A successfull response
 *
 */
app.delete("/delete:id", (req, res) => {
  res.send("deleted record");
});

/**
 * @swagger
 * /edit:id:
 *  put:
 *    description: Update Record
 *    responses:
 *      '200':
 *        description: A successfull response
 *
 */
app.put("/edit:id", (req, res) => {
  res.send("updated record");
});

app.listen(3001, () => {
  console.log("running on the port 3001");
});
