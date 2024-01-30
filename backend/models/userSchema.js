import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"],
        minLength: [3, "Your name must be at least 3 characters long"],
        maxLength: [30, "Your name cannot exceed 30 characters"]
    },
    email: {
        type: String,
        required: [true, "Please enter your email address"],
        unique: true,
        validate: [validator.isEmail, "Please enter a valid email address"]
    },
    phone: {
        type: Number,
        required: [true, "Please enter your phone number"],
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        minLength: [4, "Your password must be at least 4 characters long"],
        maxLength: [30, "Your password cannot exceed 30 characters"],
        select: false
    },
    role: {
        type: String,
        required: [true, "Please enter your role"],
        default: "user",
        enum: ["Job seeker", "Employer"]
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

//hassing the password before saving the user model
userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

//compairing password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

//GENERATING A JWT TOKEN WHEN A USER REGISTERS OR LOGINS, IT DEPENDS ON OUR CODE THAT WHEN DO WE NEED TO GENERATE THE JWT TOKEN WHEN THE USER LOGIN OR REGISTER OR FOR BOTH. 
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRES,
    });
  };

export const User = mongoose.model("User", userSchema);