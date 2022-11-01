const express = require("express");
const cors = require("cors");
const app = express();
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();
const port = process.env.PORT || 5000;

// middle wares
app.use(cors());
app.use(express.json());

// mongo DB connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.2ahck7i.mongodb.net/?retryWrites=true&w=majority`;

async function app() {
  try {
    const serviceCollection = client
      .db("geniusCarByMezan")
      .collection("service");
  } finally {
  }
}

app().catch((error) => console.log(error));

app.get("/", (req, res) => {
  res.send("Genius Car Server is Running");
});
app.listen(port, () => {
  console.log(`Genius Car Server is Running On Port ${port}`);
});
