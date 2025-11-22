import { Router } from "express";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";

const router = Router();

// Protected route: get current user
router.get(
  "/",
  ClerkExpressRequireAuth({ apiKey: process.env.CLERK_SECRET_KEY }),
  (req, res) => {
    try {
      res.json({
        success: true,
        userId: req.auth.userId,
        role: "hotelOwner", // replace with DB role if you have
        recentSearchedCities: [], // optional
      });
    } catch (err) {
      console.error("Error in /api/user:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

export default router;
