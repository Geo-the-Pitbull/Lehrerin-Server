const Teachers = require("../controllers/teacher.controller");
const express = require('express');
const router = express.Router()

// Create a new teacher
router.post("/", Teachers.create);
  
// Retrieve all teachers
router.get("/", Teachers.findAll);
  
// Retrieve a single teacher with id
router.get("/:id", Teachers.findOne);
  
// Update a teacher with id
router.put("/:id", Teachers.update);
  
// Delete a teacher with id
router.delete("/:id", Teachers.delete);
  
// Delete all teachers
router.delete("/", Teachers.deleteAll);
  
   
module.exports = router;