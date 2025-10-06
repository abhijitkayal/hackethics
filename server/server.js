const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const razorpay = new Razorpay({
  key_id: "rzp_test_RL5AnT6meWeDmw", 
  key_secret: "S0XX6gZZDfifwp0o8kUe0n7I",
});

app.post("/order", async (req, res) => {
  try {
    const options = {
      amount: req.body.amount,
      currency: req.body.currency,
      receipt: "receipt_order_" + Math.floor(Math.random() * 10000),
    };
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating order");
  }
});

app.post("/create-order", async (req, res) => {
  try {
    const { amount, currency = "INR", receipt } = req.body;

    const options = {
      amount: amount * 100, 
      currency,
      receipt: receipt || `rcpt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error("Order creation failed:", error);
    res.status(500).json({ error: "Failed to create order" });
  }
});
app.listen(5000, () => console.log("Server running on port 5000"));
