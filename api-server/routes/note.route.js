const Notes = require("../controllers/note.controller");
const express = require('express');
const router = express.Router()
const authenticate = require('../middleware/authenticate')

// Create a new note
router.post("/", authenticate, Notes.create);
  
// Retrieve all notes
router.get("/", authenticate, Notes.findAll);
  
// Retrieve a single note with id
router.get("/:id", authenticate, Notes.findOne);
  
// Update a note with id
router.put("/:id",  authenticate, Notes.update);
  
// Delete a note with id
router.delete("/:id",  authenticate, Notes.delete);
  
// Delete all notes
router.delete("/",  authenticate, Notes.deleteAll);
  
   
module.exports = router;