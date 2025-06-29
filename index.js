// const express = require("express");
// const app = express();
// const mongoose = require("mongoose");
// require("dotenv").config();
// const cors = require("cors");
// const Razorpay = require("razorpay");

// Import Routes
// const authRoutes = require("./routes/auth.js");
// const listingRoutes = require("./routes/listing.js");
// const bookingRoutes = require("./routes/booking.js");
// const userRoutes = require("./routes/user.js");

// Middleware
// app.use(cors());
// app.use(express.json());
// app.use(express.static("public"));
// app.use(express.urlencoded({ extended: false }));

/* ROUTES */
// app.use("/auth", authRoutes);
// app.use("/properties", listingRoutes);
// app.use("/bookings", bookingRoutes);
// app.use("/users", userRoutes);

// Razorpay Setup (Fix variable name)
// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// API endpoint to create an order
// app.post("/api/razorpay", async (req, res) => {
//   const { amount } = req.body;

//   try {
//     const order = await razorpay.orders.create({
//       amount: amount * 100,
//       currency: "INR",
//       receipt: `receipt_${Date.now()}`,
//       payment_capture: 1,
//     });
//     res.json({
//       id: order.id,
//       amount: order.amount,
//       currency: order.currency,
//     });
//   } catch (error) {
//     console.error("Error creating Razorpay order:", error);
//     res.status(500).json({ error: "Failed to create order" });
//   }
// });

/* MONGOOSE SETUP */
// const PORT = 3001;
// mongoose
//   .connect(process.env.MONGO_URL, { dbName: "Dream_Nest" })
//   .then(() => {
//     app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
//   })
//   .catch((err) => console.log(`${err} did not connect`));

// app.use((req, res, next) => {
//   res.status(404).json({ message: "Route not found" });
// });

// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ message: "Internal Server Error" });
// });

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");
const Razorpay = require("razorpay"); // ✅ Ensure proper import

const authRoutes = require("./routes/auth.js");
const listingRoutes = require("./routes/listing.js");
const bookingRoutes = require("./routes/booking.js");
const userRoutes = require("./routes/user.js");

const app = express();

// CORS configuration for production
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? ["https://your-frontend-domain.com"] // Replace with your frontend URL
        : ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

/* ROUTES */
app.use("/auth", authRoutes);
app.use("/properties", listingRoutes);
app.use("/bookings", bookingRoutes);
app.use("/users", userRoutes);

// ✅ Initialize Razorpay instance correctly
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ✅ API endpoint to create an order
app.post("/api/razorpay", async (req, res) => {
  const { amount } = req.body;

  try {
    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1,
    });

    res.json({
      id: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).json({ error: "Failed to create order" });
  }
});

// ✅ Payment success handling route
app.post("/api/payment/success", async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  console.log("Received payment details:", req.body); // ✅ Debugging log

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res.status(400).json({ msg: "Invalid payment response" });
  }

  res.json({ msg: "Payment successful" });
});

// Health check endpoint for Render
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Server is running" });
});

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 3001;
mongoose
  .connect(process.env.MONGO_URL, { dbName: "Dream_Nest" })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port: ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
    });
  })
  .catch((err) => console.log(`${err} did not connect`));

/* ERROR HANDLING */
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});
