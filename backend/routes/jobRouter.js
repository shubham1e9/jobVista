import express from "express";
import { getAllJobs, postJob, getmyJobs, updateJob, deleteJob, getSingleJob } from "../controllers/jobController.js";
import { isAuthorized } from "../middlewares/auth.js"

const router = express.Router();

router.get("/getall", getAllJobs);
router.post("/postjob", isAuthorized, postJob);
router.get("/getmyjobs", isAuthorized, getmyJobs);
router.put("/update/:id", isAuthorized, updateJob);
router.delete("/delete/:id", isAuthorized, deleteJob);
router.get("/:id", isAuthorized, getSingleJob);

export default router;