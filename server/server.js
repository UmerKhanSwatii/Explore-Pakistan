import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import cloudinary from "cloudinary";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import citiesRoutes from "./routes/citiesRoutes.js";
import dbConnection from "./config/db.js";
import bodyParser from "body-parser";

//config dotenv
dotenv.config();

//db config
dbConnection();
//cloudinary Config
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

//static files

//rest object
const app = express();

//middlewares
app.use(bodyParser.json()); // Parse JSON data
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

//routes

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/service", serviceRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/cities", citiesRoutes);

//port
const PORT = process.env.PORT || 8080;
console.warn(PORT);
//run listen

app.get("/", (req, resp) => {
  resp.send("Hello");
});

app.listen(PORT, () => {
  console.warn(
    `Server is running at ${process.env.DEV_MODE} mode at port ${PORT}`
  );
});
