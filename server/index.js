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
 *    summary: Get all advertisements.
 *    responses:
 *      '200':
 *        description: A successfull response
 *
 */
app.get("/homelist", async (req, res) => {
  //Read
  try {
    const {
      search,
      sortDirection,
      sortField,
      category,
      minPrice,
      maxPrice,
      price,
    } = req.query;
    let q = {};
    q["$or"];

    if (category) {
      category.split(",").forEach((value) => {
        if (!q["$or"]) {
          if (value != "undefined") {
            q["$or"] = [{ category: value }];
          } else {
            q = {};
          }
        } else {
          q["$or"].push({ category: value });
        }
      });
    }

    if (minPrice) {
      q["price"] = { $gte: +minPrice };
    }

    if (maxPrice) {
      if (q["price"]) {
        q["price"]["$lte"] = +maxPrice;
      } else {
        q["price"] = { $lte: +maxPrice };
      }
    }

    if (search) {
      if (!q["$or"]) {
        q["$or"] = [{ address: search }, { name: search }];
      } else {
        q["$or"].push({ address: search });
        q["$or"].push({ name: search });
      }
    }

    console.log(q);

    const sortInHome = {};

    if (sortField && sortDirection != "undefined") {
      sortInHome[sortField] = sortDirection === "ascend" ? 1 : -1;
    }

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
 *  @swagger
 *
 * paths:
 *   /addhome:
 *     post:
 *       summary: Creates a new advertisement.
 *       consumes:
 *         - application/json
 *       parameters:
 *         - in: body
 *           name: Advertisement
 *           description: Creates a new  advertisement.
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               image:
 *                 type: string
 *               room:
 *                 type: integer
 *                 format: int32
 *               floor:
 *                 type: integer
 *                 format: int32
 *               area:
 *                 type: number
 *                 format: double
 *               address:
 *                 type: string
 *               desc:
 *                 type: string
 *               price:
 *                 type: integer
 *                 format: int32
 *               typeCard:
 *                 type: string
 *               category:
 *                 type: string
 *       responses:
 *         200:
 *           description: Created
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
 *  @swagger
 *
 * paths:
 *   /delete/{id}:
 *     delete:
 *       summary: Delete an advertisement.
 *       consumes:
 *         - application/json
 *       parameters:
 *         - in: path
 *           name: id
 *           schema:
 *           type: string
 *           required: true
 *           description: id of advertisement
 *       responses:
 *         201:
 *           description: OK
 */

app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;

  await homeModel.findByIdAndRemove(id).exec();
  res.send("deleted");
});

/**
 *  @swagger
 *
 * paths:
 *   /homelist/{id}:
 *     get:
 *       summary: Get specific advertisement info.
 *       consumes:
 *         - application/json
 *       parameters:
 *         - in: path
 *           name: id
 *           schema:
 *           type: string
 *           required: true
 *           description: id of advertisement
 *       responses:
 *         201:
 *           description: OK
 */

app.get("/homelist/:id", async (req, res) => {
  const id = req.params.id;

  homeModel.findById(id, (err, result) => {
    if (err) {
      res.send(err);
    }

    res.send(result);
  });
});

app.listen(3001, () => {
  console.log("running on the port 3001");
});
