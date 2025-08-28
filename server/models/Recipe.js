const mongoose = require("mongoose");

const ingredientSchema = new mongoose.Schema({
    quantity: mongoose.Schema.Types.Mixed, // can be Number or String ("to taste", "2 to 3")
    unit: { type: String },
    name: { type: String, required: true }
});

const recipeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    picture: { type: String, required: true },
    prep_time: { type: Number, required: true },
    cook_time: { type: Number, required: true },
    description: { type: String, required: true },
    ingredients: [ingredientSchema],
    datetime_added: { type: Date, default: Date.now },
    uploader: { type: String, required: true }
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;