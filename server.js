require("dotenv").config();
const express = require("express");
const connectDB = require("./db");
const cors = require("cors");
const app = express();

// Import routes
const routes = require("./routes/authroute");

// Connect to MongoDB database
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/api/auth", routes); //http://localhost:8000/api/auth/register
// Start the server
PORT = process.env.PORT || 8000;
app.listen(PORT),
  () => {
    console.log(`Server running on port ${PORT}`);
  };
