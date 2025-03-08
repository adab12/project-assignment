const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//secrets keys for jwt
const JWT_KEY = process.env.JWT_SECRET_KEY;

exports.register = async (req, res) => {
  try {
    const {
      fullName,
      email,
      password,
      confirmPassword,
      phoneNumber,
      gender,
      dateOfBirth,
    } = req.body;

    //check password match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    //check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    //create a new user
    const newUser = await User({
      fullName,
      email,
      password: hashedPassword,
      phoneNumber,
      gender,
      dateOfBirth,
    });
    await newUser.save();
    res.status(201).json({ message: "user created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error });
  }
};

//login a usr
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //check if user already exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "invalid email or passward" });
    }

    //compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    //generate jwt token
    const token = jwt.sign({ userId: user._id, email: user.email }, JWT_KEY, {
      expiresIn: "1h",
    });
    res.status(200).json({ message: "login successful", token });
  } catch (err) {
    res.status(500).json({ message: "server error", error });
  }
};
