import express from 'express'
const router = express.Router();

// controller functions
import {signupUser, loginUser } from '../controllers/User_controller'

const User_route = express.Router()

// login route
User_route.post('/login', loginUser)

// signup route
User_route.post('/signup', signupUser)

router.get('/logout', (req, res) => {
    req.session.destroy(); // Clear the session
    res.status(200).json({ message: 'Logout successful' });
  });

module.exports = User_route