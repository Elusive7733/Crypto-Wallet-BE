import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// Constants
const app = express();
const SERVER_PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

// Routes Import
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import walletRoutes from "./routes/wallet.js";
import coinRoutes from "./routes/coin.js";
import roleRoutes from "./routes/role.js";
import transactionRoutes from "./routes/transaction.js";

//Project Setup
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use((error, req, res, next) => {
  console.log(error);
  const statusCode = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(statusCode).json({ message: message, data: data });
});

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/wallet", walletRoutes);
app.use("/coin", coinRoutes);
app.use("/role", roleRoutes);
app.use("/transaction", transactionRoutes);

// Connecting to MongoDB and Start Server
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(SERVER_PORT, () => {
      console.log(`Server running on Port ${SERVER_PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
