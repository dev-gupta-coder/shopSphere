import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

//  .pre("save")  ==  Run this function BEFORE saving a user document 
//mean ki db me save hone se phle hashed ho jaye
// userSchema.pre(
//   "save",
//   async function (next) {

//     if (  !this.isModified("password") ) //If password is NOT modified,
//       return next(); //skip hashing and continue saving.

//     this.password =
//       await bcrypt.hash(this.password, 10 );
//     next();
//   }
// );

userSchema.pre(
  "save",
  async function () {

    if (!this.isModified("password"))
      return;

    this.password =
      await bcrypt.hash(
        this.password,
        10
      );
  }
);

//compare entered password and 
userSchema.methods
.comparePassword =
async function (
  enteredPassword
) {
  return bcrypt.compare(
    enteredPassword,
    this.password
  );
};



//generate ACCESS token
userSchema.methods
.generateAccessToken =
function () {

  return jwt.sign(
    {
      _id: this._id,
      role: this.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

//upper schema bana tha aur ab ye model h
const User = mongoose.model(
  "User",
  userSchema
);

export default User;