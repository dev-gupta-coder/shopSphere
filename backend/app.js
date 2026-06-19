import express from "express";//for makng app
import cors from "cors"; //connect fron->back
import cookieParser from "cookie-parser";//used in jwt
import morgan from "morgan";//return logs/status like(200,201,400,509,etc)
import productRoutes from "./src/routes/product.routes.js";
import errorHandler from "./src/middleware/error.middleware.js";
import authRoutes from "./src/routes/auth.routes.js";
import cartRoutes from "./src/routes/cart.routes.js"
import wishlistRoutes from "./src/routes/wishlist.routes.js";
import orderRoutes from "./src/routes/order.routes.js"
import userRoutes from "./src/routes/user.routes.js"
const app = express();

app.use(cors({
  origin:
    "http://localhost:5174",

  credentials: true
}));
app.use(express.json());//JSON ko readable banayega

app.use(cookieParser());//store cookie and provide to express to read

app.use(morgan("dev"));//logs/status like ->200, 201, 400

app.get("/", (req, res) => {
  res.send("ShopSphere API Running");
});

app.use("/api/v1/products", productRoutes); 

app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/cart",cartRoutes)
app.use(   "/api/v1/wishlist", wishlistRoutes );
app.use("/api/v1/orders", orderRoutes)
app.use("/api/v1/users",userRoutes); 
 
 


app.use(errorHandler);
export default app;