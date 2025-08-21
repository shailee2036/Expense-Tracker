// //Importing libraries
// const jwt = require("jsonwebtoken");
// const { OAuth2Client } = require('google-auth-library');

// const User = require("../models/User");

// // Initialize Google OAuth client
// const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// // Generate JWT token
// const generateToken = (id) => {
//  return jwt.sign( {id}, process.env.JWT_SECRET, { expiresIn: "1h" }); 
// };

// // Register User
// exports.registerUser = async (req, res) => {
//     const { fullName, email, password, profileImageUrl} = req.body;

//     //Validation:Check for existing fields
//     if (!fullName || !email || !password) {
//         return res.status(400).json({ message: "All fields are required" });
//     }
//          try {
//             // Check if email already exists
//             const existingUser = await User.findOne({ email });
//             if (existingUser) {
//                 return res.status(400).json({ message: "Email already in use" });
//             }
//                 // Create the user
//                 const user = await User.create({
//                     fullName, email, password, profileImageUrl,
//                 });
                
//                 res.status(201).json({
//                     id:user._id,
//                     user,
//                     token:generateToken(user._id),
//                 });

//         }   catch(err){
//                 res.status(500).json({message: "Error registering user", error:err.message})
//             }
// };

// // Login User
//  exports.loginUser = async (req, res) => {
// const { email, password} = req.body;

//     //Validation:Check for existing fields
//     if (!email || !password) {
//         return res.status(400).json({ message: "All fields are required" });
//     }
//          try {
//             const user = await User.findOne({ email });
//             if (!user || !await user.comparePassword(password)) {
//                 return res.status(400).json({ message: "Invalid Credentials" });
//             }
                
//                 res.status(201).json({
//                     id:user._id,
//                     user,
//                     token:generateToken(user._id),
//                 });

//         }   catch(err){
//                 res.status(500).json({message: "Error Logging user", error:err.message})
//             }

//  };

// // Google Login - NEW FUNCTION
// exports.googleLogin = async (req, res) => {
//     const { credential } = req.body;

//     if (!credential) {
//         return res.status(400).json({ message: "Google credential is required" });
//     }

//     try {
//         // Verify the Google JWT token
//         const ticket = await client.verifyIdToken({
//             idToken: credential,
//             audience: process.env.GOOGLE_CLIENT_ID,
//         });

//         const payload = ticket.getPayload();
//         const { email, name, picture, sub: googleId } = payload;

//         if (!email) {
//             return res.status(400).json({ message: "Email not provided by Google" });
//         }

//         // Check if user already exists
//         let user = await User.findOne({ email });

//         if (!user) {
//             // Create new user for Google sign-in
//             user = await User.create({
//                 fullName: name,
//                 email,
//                 profileImageUrl: picture,
//                 googleId,
//                 // Note: No password for Google users
//             });
//         } else if (!user.googleId) {
//             // Link Google account to existing user
//             user.googleId = googleId;
//             if (!user.profileImageUrl && picture) {
//                 user.profileImageUrl = picture;
//             }
//             await user.save();
//         }

//         res.status(200).json({
//             id: user._id,
//             user,
//             token: generateToken(user._id),
//         });

//     } catch (error) {
//         console.error('Google auth error:', error);
//         res.status(400).json({ message: "Google authentication failed", error: error.message });
//     }
// };

// //Get User Info
// exports.getUserInfo = async (req, res) => {
//      try {
//             // Check if email already exists
//             const user = await User.findById(req.user.id).select("-password");
//             if (!user) {
//                 return res.status(400).json({ message: "User not found" });
//             }   
//                 res.status(200).json(user);

//     }   catch(err){
//                 res.status(500).json({message: "Error Logging user", error:err.message})
//         }
// };

//Importing libraries
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require('google-auth-library');

const User = require("../models/User");

// Initialize Google OAuth client
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Generate JWT token
const generateToken = (id) => {
 return jwt.sign( {id}, process.env.JWT_SECRET, { expiresIn: "1h" }); 
};

// Register User
exports.registerUser = async (req, res) => {
    const { fullName, email, password, profileImageUrl} = req.body;

    //Validation:Check for existing fields
    if (!fullName || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
         try {
            // Check if email already exists
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: "Email already in use" });
            }
                // Create the user
                const user = await User.create({
                    fullName, email, password, profileImageUrl,
                });
                
                res.status(201).json({
                    id:user._id,
                    user,
                    token:generateToken(user._id),
                });

        }   catch(err){
                res.status(500).json({message: "Error registering user", error:err.message})
            }
};

// Login User
 exports.loginUser = async (req, res) => {
const { email, password} = req.body;

    //Validation:Check for existing fields
    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
         try {
            const user = await User.findOne({ email });
            if (!user || !await user.comparePassword(password)) {
                return res.status(400).json({ message: "Invalid Credentials" });
            }
                
                res.status(201).json({
                    id:user._id,
                    user,
                    token:generateToken(user._id),
                });

        }   catch(err){
                res.status(500).json({message: "Error Logging user", error:err.message})
            }

 };

// Google Login - UPDATED FUNCTION
exports.googleLogin = async (req, res) => {
    const { credential } = req.body;

    if (!credential) {
        return res.status(400).json({ message: "Google credential is required" });
    }

    try {
        // Verify the Google JWT token
        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        const { email, name, picture, sub: googleId } = payload;

        if (!email) {
            return res.status(400).json({ message: "Email not provided by Google" });
        }

        // Check if user already exists - THIS IS THE KEY CHANGE
        const user = await User.findOne({ email });

        if (!user) {
            // User doesn't exist - reject login
            return res.status(404).json({ 
                message: "No account found with this email. Please sign up first." 
            });
        }

        // If user exists but doesn't have googleId, link it
        if (!user.googleId) {
            user.googleId = googleId;
            if (!user.profileImageUrl && picture) {
                user.profileImageUrl = picture;
            }
            await user.save();
        }

        res.status(200).json({
            id: user._id,
            user,
            token: generateToken(user._id),
        });

    } catch (error) {
        console.error('Google auth error:', error);
        res.status(400).json({ message: "Google authentication failed", error: error.message });
    }
};

// Google Signup - NEW FUNCTION
exports.googleSignup = async (req, res) => {
    const { credential } = req.body;

    if (!credential) {
        return res.status(400).json({ message: "Google credential is required" });
    }

    try {
        // Verify the Google JWT token
        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        const { email, name, picture, sub: googleId } = payload;

        if (!email) {
            return res.status(400).json({ message: "Email not provided by Google" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ 
                message: "User already exists. Please log in instead." 
            });
        }

        // Create new user for Google signup
        const user = await User.create({
            fullName: name,
            email,
            profileImageUrl: picture,
            googleId,
            // No password for Google users
        });

        res.status(201).json({
            id: user._id,
            user,
            token: generateToken(user._id),
        });

    } catch (error) {
        console.error('Google signup error:', error);
        res.status(400).json({ message: "Google signup failed", error: error.message });
    }
};

//Get User Info
exports.getUserInfo = async (req, res) => {
     try {
            // Check if email already exists
            const user = await User.findById(req.user.id).select("-password");
            if (!user) {
                return res.status(400).json({ message: "User not found" });
            }   
                res.status(200).json(user);

    }   catch(err){
                res.status(500).json({message: "Error Logging user", error:err.message})
        }
};

// Make sure to export all functions
// module.exports = {
//     registerUser,
//     loginUser,
//     getUserInfo,
//     googleLogin,
//     googleSignup
// };