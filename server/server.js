import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";

dotenv.config();
const app = express();

// -----------------
// CORS Setup
// -----------------
app.use(cors({
  origin: ["http://localhost:5173"], // frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true, // required for Authorization headers
}));

// JSON middleware
app.use(express.json());

// -----------------
// MongoDB Connection
// -----------------
mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Database Connected"))
  .catch(err => console.log("Database Connection Error:", err));

// -----------------
// Protected /api/user
// -----------------
app.get(
  "/api/user",
  ClerkExpressRequireAuth({ apiKey: process.env.CLERK_SECRET_KEY, jwtKey: "custom_token" }),
  (req, res) => {
    try {
      if (!req.auth || !req.auth.userId) {
        return res.status(401).json({ error: "Unauthenticated" });
      }

      // Here you can fetch real user data from DB if needed
      res.json({
        success: true,
        userId: req.auth.userId,
        role: "hotelOwner", // replace with DB role
        recentSearchedCities: [], // replace with DB data
      });
    } catch (err) {
      console.error("Error in /api/user:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

// -----------------
// Public /api/hotels
// -----------------
app.post("/api/hotels", (req, res) => {
  try {
    const hotelData = req.body;
    console.log("Hotel Data Received:", hotelData);
    res.json({ success: true, message: "Hotel registered successfully!", data: hotelData });
  } catch (err) {
    console.error("Hotel registration error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// -----------------
// Catch-all Error Handler
// -----------------
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err);
  res.status(500).json({ error: "Something went wrong!" });
});

// -----------------
// Start Server
// -----------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
