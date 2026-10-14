import express from 'express';
import dotenv from 'dotenv';
import hbs from 'hbs';
import { connectDB } from './config/db.js';
import ApiRouter from "./routes/api.js";
import OrderViewRouter from "./routes/OrderViewRoute.js";
import AuthViewRouter from "./routes/AuthViewRoute.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.set("view engine", "hbs");
app.set("views", "./views");

// Helpers dùng trong file .hbs (Handlebars không cho gọi hàm JS trực tiếp)
hbs.registerHelper("formatDate", (date) => new Date(date).toLocaleDateString());
hbs.registerHelper("formatPrice", (price) => price.toLocaleString());
hbs.registerHelper("inputDate", (date) => new Date(date).toISOString().slice(0, 10));
hbs.registerHelper("eq", (a, b) => a === b);
app.use(express.static("public"));


connectDB();

app.use("/api", ApiRouter);
app.use("/", AuthViewRouter);
app.use("/orders", OrderViewRouter);
app.get("/",(req,res)=>{

    res.json({
        message:"API running"
    });

});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});