import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser, useAuth } from "@clerk/clerk-react";
import { toast } from "react-hot-toast";

// Set Axios base URL from environment variable
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY || "$";
  const navigate = useNavigate();
  const { user } = useUser();
  const { getToken } = useAuth();

  const [isOwner, setIsOwner] = useState(false);
  const [showHotelReg, setShowHotelReg] = useState(false);
  const [searchedCities, setSearchedCities] = useState([]);

  // ----------------------
  // Fetch authenticated user
  // ----------------------
  const fetchUser = async () => {
    try {
      // Use the correct Clerk token template
      const token = await getToken({ template: "custom_token" });
      console.log("Clerk token:", token); // <-- Add this line


      const { data } = await axios.get("/api/user", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setIsOwner(data.role === "hotelOwner");
        setSearchedCities(data.recentSearchedCities || []);
      } else {
        // Retry after 5 seconds if user data not ready
        setTimeout(fetchUser, 5000);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      toast.error(error.response?.data?.error || error.message || "Failed to fetch user");
    }
  };

  // Fetch user whenever Clerk user is available
  useEffect(() => {
    if (user) {
      fetchUser();
    }
  }, [user]);

  // ----------------------
  // Context values
  // ----------------------
  const value = {
    currency,
    navigate,
    user,
    getToken,
    isOwner,
    setIsOwner,
    axios,
    showHotelReg,
    setShowHotelReg,
    searchedCities,
    setSearchedCities,
    fetchUser,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
