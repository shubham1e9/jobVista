import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title : {
        type: String,
        required: [true, "Please provide a title"],
        maxlength: [50, "Title cannot be more than 50 characters"],
        minlength: [5, "Title cannot be less than 5 characters"],   
    },
    description : {
        type: String,
        required: [true, "Please provide a description"],
        maxlength: [500, "Description cannot be more than 500 characters"],
        minlength: [20, "Description cannot be less than 20 characters"],   
    },
    category : {
        type: String,
        required: [true, "Please provide a job category"],
        maxlength: [30, "Category cannot be more than 30 characters"],
        minlength: [5, "Category cannot be less than 5 characters"],   
    },
    country : {
        type: String,
        required: [true, "Please provide a country name"],
        maxlength: [30, "Country cannot be more than 30 characters"],
        minlength: [3, "Country cannot be less than 3 characters"],
    },
    city : {
        type: String,
        required: [true, "Please provide a city"],
        maxlength: [30, "City cannot be more than 30 characters"],
        minlength: [3, "City cannot be less than 3 characters"],   
    },
    location : {
        type: String,
        required: [true, "Please provide a location"],
        maxlength: [30, "location cannot be more than 30 characters"],
        minlength: [3, "location cannot be less than 3 characters"],   
    },
    fixedSalary : {
        type: Number,
        required: [true, "Please provide a salary"],
        maxlength: [10, "Salary cannot be more than 10 characters"],
        minlength: [4, "Salary cannot be less than 4 characters"],   
    },
    salaryFrom : {
        type: Number,
        maxlength: [30, "Salary from cannot be more than 30 characters"],
        minlength: [5, "Salary from cannot be less than 5 characters"],   
    },
    salaryTo : {
        type: Number,
        maxlength: [30, "Salary to cannot be more than 30 characters"],
        minlength: [5, "Salary to cannot be less than 5 characters"],   
    },
    expired : {
        type: Boolean,
        default: false,
    },
    jobPostedOn : {
        type: Date,
        default: Date.now,
    },
    postedBy : {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
});

export const Job = mongoose.model("Job", jobSchema);