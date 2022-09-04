const Notes = require("../controllers/note.controller");
const express = require('express');
const router = express.Router()
const authenticate = require('../middleware/authenticate')

// Create a new note
router.post("/", Notes.create);
  
// Retrieve all notes
router.get("/", authenticate, Notes.findAll);
  
// Retrieve a single note with id
router.get("/:id", Notes.findOne);
  
// Update a note with id
router.put("/:id", Notes.update);
  
// Delete a note with id
router.delete("/:id", Notes.delete);
  
// Delete all notes
router.delete("/", Notes.deleteAll);
  
   
module.exports = router;