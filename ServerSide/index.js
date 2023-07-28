// Import essential libraries
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
// Enject pug
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
// set Directory in public Folder
app.use(express.static(path.join(__dirname, "public")));
// Add Json convert or sanitize
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// set up .env
require("dotenv").config();
// set up MongoDb
const { MongoClient } = require("mongodb");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
// Use the cors
app.use(cors());
// Routes
app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

app.get("/api/list-of-item", async (req, res) => {
  const mongodb_url =
    "mongodb+srv://minh160394:" +
    process.env.MONGO_PASSWORD +
    "@cluster101.cswm4y8.mongodb.net/";
  const db_Name = "Camera_Ecommerce";
  const client = new MongoClient(mongodb_url);
  try {
    await client.connect();
    const db = client.db(db_Name);
    const inventoryCollection = db.collection("inventory");
    const inventoryData = await inventoryCollection.find().toArray();
    res.json(inventoryData);
  } catch (err) {
    console.error("Error fetching data:", err);
    res.json({ error: "Out of Stocks" });
    throw err;
  } finally {
    client.close();
  }
});
app.post("/api/create-checkout-session", async (req, res) => {
  const product = req.body;
  const line_items = product.map((item) => {
    const unitAmountInPaise = item.price * 100;
    return {
      price_data: {
        currency: "cad",
        product_data: {
          name: item.item_name,
        },
        unit_amount: unitAmountInPaise,
      },
      quantity: item.quantity_cart,
    };
  });
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items,
    mode: "payment",
    success_url: "http://localhost:5173/success",
    cancel_url: "http://localhost:5173/cancel",
  });
  res.send({ url: session.url });
});

app.listen(process.env.PORT || 8080);
console.log("Running at Port " + process.env.PORT);
