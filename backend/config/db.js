//Imports the Mongoose library, which is an ODM (Object Data Modeling) tool for MongoDB and Node.js.
// It helps in managing relationships between data, schema validation, and translates between 
// objects in code and the database.

//Importing Libraries
const mongoose = require("mongoose");

//This function will attempt to establish a connection to your MongoDB database using await
const connectDB = async() => {
    try{
        /* --> mongoose.connect(...): Tries to connect to the MongoDB database.
           --> process.env.MONGO_URI: Retrieves the MongoDB connection string from environment 
               variables (usually stored in a .env file).
           --> {}: An optional settings object for the connection (you can specify options like
               useNewUrlParser, useUnifiedTopology, etc.). Currently, it’s empty. */
        
        await mongoose.connect(process.env.MONGO_URI, {});
        console.log("MongoDB Connected!!");   
    }
    catch(err){
        console.log("Error connecting to MongoDB", err);
        process.exit(1);
    }
};

module.exports = connectDB;