// Import necessary packages
import express from 'express';
import { signupUser, loginUser, logoutUser,getUserDetails } from '../controllers/User_controller';


// Create an instance of express router
const User_route = express.Router();

// Define routes
User_route.post('/login', loginUser);    // Login route
User_route.post('/signup', signupUser);  // Signup route
User_route.get('/logout', logoutUser);   // Logout route
User_route.get('/details', getUserDetails); // New endpoint to get user details

// Export the router
export default User_route;
