const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();
const productModel = require("./Models/Product.js");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const got = require("got");
const { response } = require("express");
const request = require("request-promise");
const cheerio = require("cheerio");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

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

    // productModel.title = cardTitleText;

    const sortInHome = {};

    if (sortField && sortDirection != "undefined") {
      sortInHome[sortField] = sortDirection === "ascend" ? 1 : -1;
    }

    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 12;
    const skip = (page - 1) * pageSize;
    const total = await productModel.countDocuments();
    const pages = Math.ceil(total / pageSize);

    const result = await productModel
      .find(q)
      .sort(sortInHome)
      .skip(skip)
      .limit(pageSize);

    res.status(200).json({
      status: "Success",
      count: total,
      pageSize,
      page,
      pages,
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

request(
  "https://ss.ge/ka/udzravi-qoneba/l/kerdzo-saxli/iyideba",

  (error, request, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);

      const cardTitleText = $(".latest_title").text(); // ქარდის სათაური

      const descriptionText = $(".DescripTionListB").text(); // აღწერა

      const priceText = $(".latest_price").text();

      const areaText = $(".latest_flat_km").text();

      const addressText = $(".StreeTaddressList").text();

      let splittedName = cardTitleText.split("\n");
      let splittedDesc = descriptionText.split("\n");
      let splittedPrice = priceText.split("\n");
      let splittedArea = areaText.split("\n");
      let splittedAddress = addressText.split("\n");

      app.post("/addhome", async (req, res) => {
        const {
          image,
          // name,
          room,
          floor,
          area,
          address,
          desc,
          price,
          typeCard,
          category,
        } = req.body;

        let no = 0;

        try {
          for (let i = 1; i < splittedName.length; i = i + 4) {
            // console.log(splittedName[i]);
            // console.log(splittedArea[i]);
            // console.log(splittedAddress[i]);
            // console.log(splittedDesc[i]);
            // console.log(splittedPrice[i]);

            console.log(i, splittedName[i]);
            if (
              splittedName[i] !== "" &&
              splittedArea[i] !== "" &&
              splittedAddress[i] !== "" &&
              splittedDesc[i] !== "" &&
              splittedPrice[i] !== ""
            ) {
              const productRecord = new productModel({
                no: no++,
                category: category,
                typeCard: typeCard,
                image: image,
                name: splittedName[i],
                room: room,
                floor: floor,
                area: splittedArea[i],
                address: splittedAddress[i],
                desc: splittedDesc[i],
                price: splittedPrice[i],
              });
              await productRecord.save();
            }
          }

          res.send("inserted Data 2");
        } catch (error) {
          console.log(error);
          res.send(error);
        }
      });
    }
  }
);

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

  await productModel.findByIdAndRemove(id).exec();

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

app.get("/homelist/:id", (req, res) => {
  const id = req.params.id;

  productModel.findById(id, (err, result) => {
    if (err) {
      res.send(err);
    }

    res.send(result);
  });
});

app.listen(3001, () => {
  console.log("running on the port 3001");
});
