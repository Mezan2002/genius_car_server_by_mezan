const express = require("express");
const cors = require("cors");
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const port = process.env.PORT || 5000;

// middle wares start
app.use(cors());
app.use(express.json());
// middle wares end

// mongo DB connection start
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.2ahck7i.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
// mongo DB connection end

async function run() {
  try {
    const serviceCollection = client
      .db("geniusCarByMezan")
      .collection("services");

    const orderCollection = client.db("geniusCarByMezan").collection("orders");

    // get all services start
    app.get("/services", async (req, res) => {
      const query = {};
      const cursor = serviceCollection.find(query);
      const services = await cursor.toArray();
      res.send(services);
    });
    // get all services end

    // get one service start
    app.get("/services/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const service = await serviceCollection.findOne(query);
      res.send(service);
    });
    // get one service end

    // set orders start
    app.post("/orders", async (req, res) => {
      const order = req.body;
      const result = await orderCollection.insertOne(order);
      res.send(result);
    });
    // set orders end

    // get user orders start
    app.get("/orders", async (req, res) => {
      console.log(req.query);
      let query = {};
      const userEmail = req.query.email;
      if (userEmail) {
        query = {
          email: userEmail,
        };
      }
      const cursor = orderCollection.find(query);
      const orders = await cursor.toArray();
      res.send(orders);
    });
    // get user orders end

    // update orders start
    app.patch("/orders/:id", async (req, res) => {
      const id = req.params.id;
      const status = req.body.status;
      const query = { _id: ObjectId(id) };
      const updatedDoc = {
        $set: {
          status: status,
        },
      };
      const result = await orderCollection.updateOne(query, updatedDoc);
      res.send(result);
    });
    // update orders end

    // delete order start
    app.delete("/orders/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await orderCollection.deleteOne(query);
      res.send(result);
    });
    // delete order end
  } finally {
  }
}

run().catch((error) => console.log(error));

app.get("/", (req, res) => {
  res.send("Genius Car Server is Running");
});
app.listen(port, () => {
  console.log(`Genius Car Server is Running On Port ${port}`);
});
