import jwt from "jsonwebtoken";
import User from "../models/User_model";

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
};

// login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    // Store user details in session
    req.session.user = {
      _id: user._id,
      email: user.email,
      fname: user.fname,
      lname: user.lname,
      mobile: user.mobile
    };

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// logout a user
const logoutUser = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send('Error logging out');
    }
    res.redirect('/'); // Redirect to home or login page after logout
  });
};

// signup a user
const signupUser = async (req, res) => {
  const { fname, lname, mobile, email, password } = req.body;

  try {
    const user = await User.signup(fname, lname, mobile, email, password);

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const getUserDetails = async (req, res) => {
  try {
    // Check if user is logged in
    if (!req.session.user) {
      return res.status(401).json({ error: "User is not logged in" });
    }

    // If user is logged in, retrieve user details from the session
    const { _id, email, fname, lname, mobile } = req.session.user;

    // Return user details to client
    res.status(200).json({ _id, email, fname, lname, mobile });
  } catch (error) {
    // Handle any errors
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { signupUser, loginUser, logoutUser,getUserDetails };
