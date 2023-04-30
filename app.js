import express from "express";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import * as dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import authRouter from "./routes/authRoutes.js";
import openaiRoutes from "./routes/openaiRoutes.js";
// dotenv
dotenv.config();
//we need to change up how __dirname is used for ES6 purposes
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//   rest object
const app = express();
// middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));
// static file

app.use(express.static(path.join(__dirname, "./client/build")));

// routes path
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/openai", openaiRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});
const start = () => {
  // mongo connection
  connectDB();
  const PORT = process.env.PORT || "8080";
  app.listen(PORT, () => {
    console.log(`server running at ${PORT}`);
  });
};
start();
