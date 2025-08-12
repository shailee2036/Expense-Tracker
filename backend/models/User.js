//Importing Libraries
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs"); //  a library used to hash passwords securely.

// Define the User schema
const UserSchema = new mongoose. Schema ({
fullName: { type: String, required: true },
email: { type: String, required: true, unique: true },
password: { type: String, required: true },
profileImageUrl: { type: String, default: null },
 },
 { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Hash password with a salt round of 10 before saving
UserSchema.pre("save", async function (next) {
if (!this.isModified("password")) return next();
this.password = await bcrypt.hash(this.password, 10);
next();
});

// method to compare a given password with the hashed password
UserSchema.methods.comparePassword = async function (candidatePassword){
return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User",UserSchema)