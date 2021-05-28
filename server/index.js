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
 * /homelist:
 *  get:
 *    description: Use to request all advertisements
 *    responses:
 *      '200':
 *        description: A successfull response
 *
 */
app.get("/homelist", async (req, res) => {
  //Read
  try {
    const { search, sortDirection, sortField, category } = req.query;
    const q = {};
    q["$or"];

    if (category) {
      category.split(",").forEach((value) => {
        if (!q["$or"]) {
          q["$or"] = [{ category: value }];
        } else {
          q["$or"].push({ category: value });
        }
      });
    }

    if (search) {
      if (!q["$or"]) {
        q["$or"] = [{ address: search }, { name: search }];
      } else {
        q["$or"].push({ address: search });
        q["$or"].push({ name: search });
      }
    }

    const sortInHome = {};

    if (sortField && sortDirection != "undefined") {
      sortInHome[sortField] = sortDirection === "ascend" ? 1 : -1;
    }

    console.log(sortInHome);
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 12;
    const skip = (page - 1) * pageSize;
    const total = await homeModel.countDocuments(q);
    const pages = Math.ceil(total / pageSize);

    const result = await homeModel
      .find(q)
      .sort(sortInHome)
      .skip(skip)
      .limit(pageSize);

    res.status(200).json({
      status: "Success",
      count: total,
      pages,
      page,
      data: result,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      status: "Failed",
      message: "Server Error",
    });
  }
});

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
 * /addhome:
 *  post:
 *    description: Use to request all advertisements
 *    parameters:
 *      type: object
 *      required:
 *      - image
 *      - room
 *      - name
 *
 *    responses:
 *      '200':
 *        description: A successfull response
 *
 */
app.post("/addhome", async (req, res) => {
  const {
    image,
    name,
    room,
    floor,
    area,
    address,
    desc,
    price,
    typeCard,
    category,
  } = req.body;

  const homes = new homeModel({
    category: category,
    typeCard: typeCard,
    image: image,
    name: name,
    room: room,
    floor: floor,
    area: area,
    address: address,
    desc: desc,
    price: price,
  });

  try {
    await homes.save();
    res.send("inserted Data 2");
  } catch (error) {
    console.log(error);
    res.send(error);
  }
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
app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;

  await homeModel.findByIdAndRemove(id).exec();
  res.send("deleted");
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
