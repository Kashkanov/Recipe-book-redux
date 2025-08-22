import express from 'express';
import db from "../db/connection.js"
import { ObjectId } from "mongodb";

const router = express.Router();

//get all recipes
router.get("/", async (req, res) => {
    let collection = await db.collection("recipes");
    let results = await collection.find().sort({ fieldName: -1 }).toArray();
    if (!results) res.end("Not Found").status(404);
    res.send(results).status(200);
})

//get latest recipes
router.get("/latest/", async (req, res) => {
    let collection = await db.collection("recipes");
    let result = await collection.find().sort({ datetime_added: -1 }).limit(3).toArray();
    if (result.length === 0)
        res.end("Not Found").status(404);
    res.send(result[0]).status(200);
})

//get the three latest excluding the latest
router.get("/threeLatest/", async (req, res) => {
    let collection = await db.collection("recipes");
    let result = await collection.find().sort({ datetime_added: -1 }).limit(4).skip(1).toArray();
    if (result.length === 0)
        res.end("Not Found").status(404);
    res.send(result).status(200);
})

//get certain recipe
router.get("/:id", async (req, res) => {
    let collection = await db.collection("recipes");
    let query = {_id: new ObjectId(req.params.id)};
    let result = await collection.findOne(query);

    if (!result) res.end("Not Found").status(404);
    else res.send(result).status(200);
})

export default router;