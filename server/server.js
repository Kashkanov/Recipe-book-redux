const express = require("express")
const cors = require("cors")
const productController = require("./controllers/recipeController")
const authController = require("./controllers/authController")
const db = require("./db/db.js")
const multer = require("multer")
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 5050;
const app = express();

db()

app.use(express.static("public"));

// app.use(cors({
//     origin: process.env.FRONTEND_URL,
//     credentials: true
// }));

app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", process.env.FRONTEND_URL);
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");

    next();
})

app.use(cookieParser());
app.use(express.json());
app.use("/api", authController);
app.use("/recipes", productController);

// start the Express server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

