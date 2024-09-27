const mongoose = require("mongoose");

// Function to connect to the MongoDB database using mongoose
const connectDB = async () => {
    try {
        // Attempt to establish a connection to the MongoDB database
        const con = await mongoose.connect(process.env.MONGO_URI);

        // Log the host name of the MongoDB server on successful connection
        console.log(`MongoDB Connected: ${con.connection.host}`);
    } 
    catch (error) {
        // Log the error message in case the connection fails
        console.log("Error!! : " + error.message);

        // Exit the process with failure code (1) on connection failure
        process.exit(1); 
    }
}

// Export the connectDB function for use in other parts of the application
module.exports = { connectDB };
