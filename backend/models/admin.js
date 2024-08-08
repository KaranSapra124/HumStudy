const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// create schema
const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please add a username"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
  },
});

adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

adminSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password); //compares the entered password with the hashed password in the database. Returns a boolean value.
};
adminSchema.methods.generateAuthToken = async function () {
  const token = jwt.sign(
    { id: this._id, username: this.username },
    process.env.JWT_ADMIN_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE, //expires in 30 days
    }
  );
  console.log(token,'TOKEN')
  return token;
};

// create model
const Admin = mongoose.model("Admin", adminSchema); //creates a collection called "admins"

module.exports = Admin;
