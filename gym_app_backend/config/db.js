const mongoose = require("mongoose");
const config = require("config");
// const dbString = config.get("mongoURI2");
// const dbString=config.get('mongoURI1')
const dbString=config.get('mongoURI')

async function connectDB() {
    try {
        await mongoose.connect(dbString);
        console.log("Mongodb connected......");
    } catch (err) {
        console.log("DB Error: ", err.message);
        process.exit(1);
    }
}

module.exports = connectDB;