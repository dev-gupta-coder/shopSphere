import "dotenv/config";

// import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./src/config/db.js";
// dotenv.config();

const PORT = process.env.PORT || 8000;

connectDB().then(()=>{
    app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});
})
  .catch((error)=>{
    console.error("Prob in server due to db or app",error)
  })