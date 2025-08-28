const express = require("express");
const Recipe = require("../models/Recipe");

const router = express.Router();

// Get all recipes
router.get("/", async (req, res) => {
    try{
        const recipes = await Recipe.find().limit(6);
        res.json(recipes);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

// Get latest recipe
router.get("/latest/", async (req, res) => {
    try{
        const recipe = await Recipe.findOne().sort({datetime_added: -1});
        res.json(recipe);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

// Get three latest recipes
router.get("/threeLatest/", async (req, res) => {
    try{
        const recipes = await Recipe.find().sort({datetime_added: -1}).limit(3);
        res.json(recipes);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

// Get one recipe
router.get("/:id", async (req, res) => {
    try{
        const recipe = await Recipe.findById(req.params.id);
        res.json(recipe);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

module.exports = router;