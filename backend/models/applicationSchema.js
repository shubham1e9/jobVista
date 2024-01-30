import mongoose from "mongoose";
import validator from "validator";

const applicationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        minlength: [3, "Name should be atleast 3 characters long"],
        maxlength: [20, "Name should not be more than 20 characters long"],
    },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, "Please enter a valid email"]
    },
    coverLetter: {
        type: String,
        required: [true, "Cover letter is required"],
    },
    phone: {
        type: Number,
        required: true,
        min: 10,
    },
    address: {
        type: String,
        required: [true, "Address is required"],
    },
    resume: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        }
    },
    applicantID: {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        role: {
            type: String,
            enum: ["Job seeker"],
            required: true,
        }
    },
    employerID: {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        role: {
            type: String,
            enum: ["Employer"],
            required: true,
        }
    },
});


export const Application = mongoose.model("Application", applicationSchema);