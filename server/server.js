const express = require("express");
const Razorpay = require("razorpay");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect("mongodb+srv://HACK:giDCgxy2d3HiO7IE@hackethic.ozjloba.mongodb.net/?retryWrites=true&w=majority&appName=HACKETHIC", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(" MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

const razorpay = new Razorpay({
  key_id: "rzp_test_RL5AnT6meWeDmw",
  key_secret: "S0XX6gZZDfifwp0o8kUe0n7I",
});

const CourseSchema = new mongoose.Schema({
  name: String,
  email: String,
  title: String,
  price: Number,
  final: Number,
  paymentId: String,
  date: { type: Date, default: Date.now },
});
const Course = mongoose.model("Course", CourseSchema);

const PaymentSchema = new mongoose.Schema({
  paymentId: String,
  orderId: String,
  email: String,
  planType: { type: String, enum: ["monthly", "yearly"], required: true },
  date: { type: Date, default: Date.now },

  expireAt: {
    type: Date,
    required: true,
  },
});

PaymentSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

const Payment = mongoose.model("Payment", PaymentSchema);



app.post("/order", async (req, res) => {
  try {
    const { amount } = req.body;
    const options = {
      amount: amount*100, 
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error("Order creation failed:", error);
    res.status(500).json({ error: "Failed to create order" });
  }
});

app.post("/store-payment", async (req, res) => {
  try {
    const { paymentId, orderId, email, planType } = req.body;
    console.log(email);

    const expiryDate = new Date();
    if (planType === "monthly") {
      expiryDate.setMonth(expiryDate.getMonth() + 1);
    } else if (planType === "yearly") {
      expiryDate.setFullYear(expiryDate.getFullYear() + 1); 
    }

    const payment = new Payment({
      paymentId,
      orderId,
      email,
      planType,
      expireAt: expiryDate,
    });

    await payment.save();

    res.json({ message: " Payment saved successfully", expires: expiryDate });
  } catch (err) {
    console.error("Error saving payment:", err);
    res.status(500).json({ error: "Database error" });
  }
});

app.get("/api/check-user/:email", async (req, res) => {
  try {
    const { email } = req.params;

    const now = new Date();
    const payment = await Payment.findOne({
      email,
      expireAt: { $gt: now },
    });

    if (payment) {
      res.json({ paid: true, planType: payment.planType, expires: payment.expireAt });
    } else {
      res.json({ paid: false });
    }
  } catch (error) {
    console.error("Error checking payment:", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/save-course", async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.json({ message: " Course saved successfully" });
  } catch (err) {
    console.error("Save failed:", err);
    res.status(500).json({ error: "Database save failed" });
  }
});

app.get("/courses/:email", async (req, res) => {
  try {
    const courses = await Course.find({ email: req.params.email });
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch courses" });
  }
});

app.listen(5000, () => console.log(" Server running on port 5000"));
