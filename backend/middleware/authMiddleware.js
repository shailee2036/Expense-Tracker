//Importing libraries
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to protect routes by verifying JWT token
exports.protect = async (req, res, next) => {
// Extract token from the Authorization header
let token = req.headers.authorization?.split(" ")[1];
  // If no token found, block access
if (!token) return res.status(401).json({ message: "Not authorized, no token" });

try {
    // Verify the token using your JWT secret
    const decoded= jwt.verify(token, process.env.JWT_SECRET);
    // Fetch the user from the DB, exclude the password field
    req.user = await User.findById(decoded.id).select('-password');
    next();
} catch (err) {
    // Token invalid or expired
    res.status(401).json({ message: "Not authorized, token failed" });
}
 
};
