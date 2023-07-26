import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";

import sales_route from "./routes/sales_route.js";
import users_route from "./routes/user_Routes.js";
import products from "./routes/products.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

const app = express();
dotenv.config();
connectDB();
const port = process.env.PORT;

// Middle wares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie-parser Middleware
app.use(cookieParser());

// API ROUTES
app.use("/api/sales/", sales_route);
app.use("/api/users/", users_route);
app.use("/api/products/", products);


// Error handling middle wares
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
