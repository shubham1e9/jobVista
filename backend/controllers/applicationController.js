import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { Application } from "../models/applicationSchema.js";
import cloudinary from "cloudinary";
import { Job } from "../models/jobSchema.js";

export const employerGetAllApplications = catchAsyncError(
  async (req, res, next) => {
    const { role } = req.User;
    if (role === "Job seeker") {
      return next(
        new ErrorHandler("You are not authorized to access this route", 400)
      );
    }
    const { _id } = req.User;
    const applications = await Application.find({ "employerID.user": _id });

    res.status(200).json({
      success: true,
      "message:": "All applications",
      applications,
    });
  }
);

export const jobseekerGetAllApplications = catchAsyncError(
  async (req, res, next) => {
    const { role } = req.User;
    if (role === "Employer") {
      return next(
        new ErrorHandler("You are not authorized to access this route", 400)
      );
    }
    const { _id } = req.User;
    const applications = await Application.find({ "applicantID.user": _id });

    res.status(200).json({
      success: true,
      applications,
    });
  }
);

export const jobSeekerDeleteApplication = catchAsyncError(
  async (req, res, next) => {
    const { role } = req.User;
    if (role === "Employer") {
      return next(
        new ErrorHandler("You are not authorized to access this route", 400)
      );
    }
    const { id } = req.params;
    const application = await Application.findById(id);
    if (!application) {
      return next(new ErrorHandler("Application not found", 404));
    }
    await application.deleteOne();

    res.status(200).json({
      success: true,
      message: "Application deleted successfully",
    });
  }
);

export const postApplication = catchAsyncError(async (req, res, next) => {
  const { role } = req.User;
  if (role === "Employer") {
    return next(
      new ErrorHandler("You are not authorized to access this route", 400)
    );
  }
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Please upload your resume", 400));
  }
  const { resume } = req.files;
  const allowedFormats = ["image/png", "image/jpg", "image/jpeg", "image/webp"];

  if (!allowedFormats.includes(resume.mimetype)) {
    return next(new ErrorHandler("Please upload an image file", 400));
  }
  console.log(resume.tempFilePath)
  const cloudinaryResponse = await cloudinary.uploader.upload(
    resume.tempFilePath
  )

  console.log(cloudinaryResponse)

  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "Cloudinary Error: ",
      cloudinaryResponse.error || "Unknown Cloudinary Error"
    );
    return next(new ErrorHandler("Something went wrong", 500));
  }

  const { name, email, coverLetter, phone, address, jobId } = req.body;
  const applicantID = {
    user: req.User._id,
    role: "Job seeker",
  };
  if (!jobId) {
    return next(new ErrorHandler("Job not found", 400));
  }
  const jobDetails = await Job.findById(jobId);
  if (!jobDetails) {
    return next(new ErrorHandler("Job not found", 400));
  }
  const employerID = {
    user: jobDetails.postedBy,
    role: "Employer",
  };
  if (
    !name ||
    !email ||
    !coverLetter ||
    !phone ||
    !address ||
    !applicantID ||
    !employerID ||
    !resume
  ) {
    return next(new ErrorHandler("Please fill all the fields", 400));
  }

  const application = await Application.create({
    name,
    email,
    coverLetter,
    phone,
    address,
    resume: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
    applicantID,
    employerID,
  });

  res.status(200).json({
    success: true,
    message: "Application submitted successfully",
    application,
  });
});
