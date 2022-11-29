//importing modules
const express = require("express");
const router = express.Router();
const AssessmentController = require("../Controllers/assessmentController");

router.post("/assessment/insert", AssessmentController.insertAssessment);
router.post("/assessment/getassessment/", AssessmentController.selectAssessment);

module.exports = router;
