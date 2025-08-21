//Importing libraries
const express = require("express"); // module to set up routing.
const {protect} = require("../middleware/authMiddleware"); // middleware which checks for a valid JWT token to protect certain routes.

const { 
registerUser,
loginUser,
getUserInfo,
googleLogin,
googleSignup
} = require("../controllers/authControllers");

//Imports a custom middleware (uploadMiddleware) that uses multer to handle file uploads.
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();// to define route paths separately and export them as a module.

// ==========================
//  Auth Routes
// ==========================

// @route   POST /register
// @desc    Register a new user

router.post("/register", registerUser);

// @route   POST /login
// @desc    Login a user and return JWT token
router.post("/login", loginUser);

// @route   GET /getUser
// @desc    Get logged-in user's info
// @access  Protected
router.get("/getUser", protect, getUserInfo);


router.post('/google-login', googleLogin);
router.post('/google-signup', googleSignup);

// ==========================
//  Image Upload Route
// ==========================

// @route   POST /upload-image
// @desc    Upload a profile image
// @access  Public (or can be protected if needed)
router.post("/upload-image", upload.single("image"),(req,res) => {
      // Check if a file was uploaded
    if(!req.file){
        return res.status(400).json({message: "No file uploaded"});
    }
    
     // Generate the public URL of the uploaded image
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
     // Return the image URL to the client
    res.status(200).json({imageUrl});
});


module.exports = router;