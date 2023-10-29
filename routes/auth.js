const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// Registering a User
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);
    const newUser = new User({
      username,
      email,
      password: hashedPass
    });
    const savedUser = await newUser.save();
    const { pass, ...others } = savedUser._doc;
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Login
router.get("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username});
    if(!user){
      return res.status(404).json({message: "User not found."});
    }
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass){
      return res.status(403).json({message: "Wrong Password"});
    }
    return res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
})

module.exports = router;