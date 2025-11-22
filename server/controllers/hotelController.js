// server/controllers/hotelController.js
import Hotel from "../models/Hotel.js"; // Mongoose model
import mongoose from "mongoose";

// POST /api/hotels/register
export const registerHotel = async (req, res) => {
  try {
    const { name, location, price, description } = req.body;

    if (!name || !location || !price || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Clerk user id
    const ownerId = req.auth.userId;

    // Create a new hotel document
    const hotel = new Hotel({
      name,
      location,
      price: parseFloat(price),
      description,
      ownerId,
    });

    // Save to MongoDB
    await hotel.save();

    res.status(201).json({
      message: "Hotel registered successfully",
      hotel,
    });
  } catch (error) {
    console.error("Register hotel error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
