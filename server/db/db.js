const mongoose = require("mongoose")
const ATLAS_URI = process.env.ATLAS_URI || "";

mongoose.set('strictQuery', true);
const db = async () => {
    mongoose
        .connect(ATLAS_URI)
        .then(() => {
            console.log('Connected to MongoDB');
        })
        .catch((e)=>{
            console.log(e);
        })
};

module.exports = db;