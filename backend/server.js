require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
const authRoutes =require("./routes/authRoutes");
const videoRoutes = require("./routes/videoRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const historyRoutes=require("./routes/historyRoutes");


connectDB();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/history",historyRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server Running");
});