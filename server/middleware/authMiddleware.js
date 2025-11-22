import { getAuth } from "@clerk/express";
import User from "../models/user.js";

export const protect = async (req, res, next) => {
  try {
    const auth = getAuth(req);

    console.log("Clerk Auth Info:", auth);

    if (!auth || !auth.userId) {
      return res.status(401).json({ success: false, message: "Not authenticated" });
    }

    let user = await User.findById(auth.userId);

    // If user doesn't exist in DB, create a new one (optional fallback)
    if (!user) {
      user = await User.create({
        _id: auth.userId,
        name: "New User",
        email: "unknown@unknown.com", // Can be fetched from JWT if needed
        role: "user",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Protect Middleware Error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
