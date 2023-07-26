import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";

// @desc Auth user/set token
// route POST /api/users/auth
// @access Public
const authUser = asyncHandler(async (req, res) => {
  // console.log(req.body)

  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).json("user not found");

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword) return res.status(400).json("Wrong email or  password");

    const data = {
      _id: user._id,
      username: user.username,
      email: user.email,
      // new Date(dates).toLocaleTimeString("en-US")
      date: new Date(user.createdAt).toLocaleDateString("en-US")
    };

    res.status(200).json(data);
  } catch (err) {
    res.status(401).json("Wrong email or  password");
  }
});

// @desc Register a new user
// route POST /api/users/auth
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  try {
    // Checking if userExist
    const { email } = req.body;
    const existUser = await User.findOne({ email });
    if (existUser) return res.status(400).json("User already exist");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    //save user and respond
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
    console.log(err.message);
  }
});

export { authUser, registerUser };
