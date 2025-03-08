const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      // userNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    console.log("MongoDB connection SUCCESS");
  } catch (error) {
    console.error("MongoDB connection ERROR:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
