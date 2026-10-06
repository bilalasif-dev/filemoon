const mongoose = require("mongoose");

async function connectDB(dbURL) {
    try {
        await mongoose.connect(dbURL);
        console.log("Database Connected Successfully.");
    }catch(error){
        console.error("Database Connection Failed: ", error)
        throw error;
    }
}

module.exports = connectDB;