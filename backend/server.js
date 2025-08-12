//Importing libraries
require("dotenv").config(); //Loads environment variables from a .env file into process.env (e.g., Mongo URI, port, etc.).
const express= require("express");
const cors= require("cors");
const path = require("path"); //built-in module to work with file and directory paths.
const connectDB = require("./config/db");//custom function that connects to MongoDB.

//Import routes.
const authRoutes = require("./routes/authRoutes");
const incomeRoutes = require("./routes/incomeRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

// Initialize the Express application
const app = express();

//Middleware to handle CORS(Cross-Origin Resource Sharing)
app.use(
    cors({
        origin:process.env.CLIENT_URL || "*",
        methods:["GET","POST","PUT","DELETE"],
        allowedHeaders:["Content-Type", "Authorization"],       
    })
);

// Parse incoming JSON requests
app.use(express.json());

// Connect to MongoDB
connectDB();

//Route Handling
app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/income",incomeRoutes);
app.use("/api/v1/expense",expenseRoutes);
app.use("/api/v1/dashboard",dashboardRoutes);

// Serve uploaded images publicly
app.use("/uploads",express.static(path.join(__dirname, "uploads")));

//Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
