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
// set up Stripe
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
// set up Sendgrid
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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
  // Retreive data from database to display in PRODUCTS PAGE
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
// Create CheckOut Session which return URL + sessionID , it bring user to stripe page.
app.post("/api/create-checkout-session", async (req, res) => {
  const product = req.body.itemList;
  // add customer Id and cart items in metadata
  const metadata = {
    userId: req.body.UserId,
    cart: JSON.stringify(product),
  };
  try {
    const customer = await stripe.customers.create({ metadata });
    // customize the each item from cart.
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
    // customize the each shipping and handle fulliment.
    const shippingPrice = 5000; // $50
    const fulfillFee = 550; // $5.5
    line_items.push({
      price_data: {
        currency: "cad",
        product_data: {
          name: "Shipping Fee", // Replace with an appropriate name for the shipping fee
        },
        unit_amount: shippingPrice,
      },
      quantity: 1, // Shipping quantity is always 1
    });
    line_items.push({
      price_data: {
        currency: "cad",
        product_data: {
          name: "Fulfillment Fee", // Replace with an appropriate name for the shipping fee
        },
        unit_amount: fulfillFee,
      },
      quantity: 1, // Shipping quantity is always 1
    });
    // Insert the details for the payment checkout
    const session = await stripe.checkout.sessions
      .create({
        payment_method_types: ["card"],
        customer: customer.id,
        line_items,
        shipping_address_collection: {
          allowed_countries: ["US", "CA"],
        },
        mode: "payment",
        success_url: "http://localhost:5173/success",
        cancel_url: "http://localhost:5173/cancel",
      })
      .catch((err) => {
        console.log(err.message);
      });
    // response to REACT with the checkout URL
    res.send({ url: session.url });
  } catch (error) {
    console.error("Error creating customer:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});
// Email Handle after transaction completed.
function handleEmail(customerDetail, transactionData) {
  const customerName = transactionData.shipping.name;
  const emailAddress = customerDetail.email;
  const shippingAddress =
    transactionData.shipping.address.line1 +
    " , " +
    transactionData.shipping.address.city +
    " , " +
    transactionData.shipping.address.state +
    " , " +
    transactionData.shipping.address.country +
    " , " +
    transactionData.shipping.address.postal_code;
  const itemList = JSON.parse(customerDetail.metadata.cart);
  const totalCost = transactionData.amount / 100; //convert it back to CAD by devide 100
  // create customize HTML for email
  const html = `
  <div>
    <h1>Your Order Details</h1>
    <p><strong>Customer Name:</strong> ${customerName}</p>
    <p><strong>Address:</strong> ${shippingAddress}</p>
    <h2>Ordered Items:</h2>
    <ul>
      ${itemList
        .map(
          (item) =>
            `<li>${item.item_name} - Price: $${item.price} - Quantity: ${item.quantity_cart}</li>`
        )
        .join("")}
    </ul>
    <p><strong>Total Cost:</strong> $${totalCost}</p>
  </div>
`;
  // format the email form.
  const msg = {
    to: emailAddress,
    from: "minh16031994@gmail.com",
    subject: "Your Order Reciept From Camera Shop",
    text: "Thank U",
    html: html,
  };
  //  Send email to customer using sendGrid
  sgMail
    .send(msg)
    .then((response) => {
      console.log(response[0].statusCode);
      console.log(response[0].headers);
    })
    .catch((error) => {
      console.error(error);
    });
}
// retrieve the customer ID and the cart-Item when the transaction completed.
function handlePaymentIntentSucceeded(paymentIntent) {
  stripe.customers.retrieve(paymentIntent.customer).then((customer) => {
    // Send the email to customer after the transaction was completely successful
    handleEmail(customer, paymentIntent);
  });
}
app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  (request, response) => {
    const event = request.body;

    // Handle the event
    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntent = event.data.object;
        // Then define and call a method to handle the successful payment intent.
        handlePaymentIntentSucceeded(paymentIntent);
        break;
      case "payment_method.attached":
        const paymentMethod = event.data.object;
        // Then define and call a method to handle the successful attachment of a PaymentMethod.
        // handlePaymentMethodAttached(paymentMethod);
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a response to acknowledge receipt of the event
    response.json({ received: true });
  }
);
app.listen(process.env.PORT || 8080);
console.log("Running at Port " + process.env.PORT);
