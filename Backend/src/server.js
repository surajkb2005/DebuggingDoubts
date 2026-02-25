import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import videoRoutes from "./routes/videoRoutes.js";

dotenv.config({path: "../.env"});

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/videos", videoRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("Debugging Doubts API is running 🚀");
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected ✅");
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB Connection Failed ❌", err);
  });