require("dotenv").config();
const mongoose = require("mongoose");
const { Schema } = mongoose;

mongoose.connect(`mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new Schema({
  id: Number,
  firstName: String,
  lastName: String,
  dob: Date,
  gender: String,
  email: String,
  password: String,
  isEmailVerified: Boolean,
  isActive: Boolean,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
