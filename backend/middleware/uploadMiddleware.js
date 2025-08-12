//Importing libraries
const multer = require('multer');//a middleware for handling multipart/form-data (mostly used for file uploads).

//Define how files should be stored
const storage =  multer.diskStorage({
     // Set the upload destination folder
    destination: (req, file, cb) => {
    cb(null, 'uploads/');

},
 // Set the filename format: current timestamp + original name
 filename: (req, file, cb) => {
 cb(null, `${Date.now()}-${file.originalname}`);
 },

 });

// File filter
// Define which file types are allowed
const fileFilter =  (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (allowedTypes.includes (file.mimetype)) {
        cb(null, true);// Accept file
    } else {
        cb(new Error('Only .jpeg, .jpg and .png formats are allowed'), false); // Reject file
    }

 };

 //Combine storage and fileFilter into multer middleware
 const upload = multer({ storage, fileFilter });

module.exports = upload;