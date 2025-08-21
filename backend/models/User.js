//Importing Libraries
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs"); //  a library used to hash passwords securely.

// Define the User schema
const UserSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { 
        type: String, 
        required: function() {
            return !this.googleId; // Password not required if it's a Google user
        }
    },
    profileImageUrl: { type: String, default: null },
    googleId: { 
        type: String, 
        default: null // Add this field for Google users
    },
}, 
{ timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Hash password with a salt round of 10 before saving
UserSchema.pre("save", async function (next) {
    // Only hash password if it exists and has been modified
    if (!this.password || !this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// method to compare a given password with the hashed password
UserSchema.methods.comparePassword = async function (candidatePassword) {
    // Return false if no password exists (Google users)
    if (!this.password) return false;
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);