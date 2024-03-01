import express from 'express'

// controller functions
import {signupUser, loginUser } from '../controllers/User_controller'

const User_route = express.Router()

// login route
User_route.post('/login', loginUser)

// signup route
User_route.post('/signup', signupUser)

module.exports = User_route