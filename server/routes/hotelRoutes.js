import express from "express";
import { requireAuth } from "@clerk/express";
import { registerHotel } from "../controllers/hotelController.js";

const router = express.Router();

router.post("/register", requireAuth(), registerHotel);

export default router;
