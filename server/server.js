const express = require("express")
const cors = require("cors")
const productController = require("./controllers/recipeController")
const db = require("./db/db.js")
const multer = require("multer")

const PORT = process.env.PORT || 5050;
const app = express();

db()

app.use(express.static("public"));

app.use(cors());
app.use(express.json());
app.use("/recipes", productController);

// start the Express server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

