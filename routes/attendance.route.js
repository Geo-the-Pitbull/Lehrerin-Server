const Attendances = require("../controllers/attendance.controller");
const express = require('express');
const router = express.Router()

// Create a new attendance
router.post("/", Attendances.create);
  
// Retrieve all attendances
router.get("/", Attendances.findAll);
  
// Retrieve a single attendance with id
router.get("/:id", Attendances.findOne);
  
// Update an attendance with id
router.put("/:id", Attendances.update);
  
// Delete an attendance with id
router.delete("/:id", Attendances.delete);
  
// Delete all attendances
router.delete("/", Attendances.deleteAll);
  
   
module.exports = router;