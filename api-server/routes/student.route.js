const Students = require("../controllers/student.controller");
const express = require('express');
const router = express.Router()

// Create a new student
router.post("/", Students.create);
  
// Retrieve all students
router.get("/", Students.findAll);
  
// Retrieve a single student with id
router.get("/:id", Students.findOne);
  
// Update a student with id
router.put("/:id", Students.update);
  
// Delete a student with id
router.delete("/:id", Students.delete);
  
// Delete all students
router.delete("/", Students.deleteAll);
  
   
module.exports = router;