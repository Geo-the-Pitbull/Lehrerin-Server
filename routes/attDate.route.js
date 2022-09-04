const AttDates = require("../controllers/attDate.controller");
const express = require('express');
const router = express.Router()

// Create a new Attendance Date
router.post("/", AttDates.create);
  
// Retrieve all Attendance Dates
router.get("/", AttDates.findAll);
  
// Retrieve a single Attendance Date with id
router.get("/:id", AttDates.findOne);
  
// Update an Attendance Date with id
router.put("/:id", AttDates.update);
  
// Delete an Attendance Date with id
router.delete("/:id", AttDates.delete);
  
// Delete all Attendance Dates
router.delete("/", AttDates.deleteAll);
  
   
module.exports = router;