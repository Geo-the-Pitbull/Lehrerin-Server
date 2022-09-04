const Groups = require("../controllers/group.controller");
const express = require('express');
const router = express.Router()

// Create a new group
router.post("/", Groups.create);
  
// Retrieve all groups
router.get("/", Groups.findAll);
  
// Retrieve a single group with id
router.get("/:id", Groups.findOne);
  
// Update a group with id
router.put("/:id", Groups.update);
  
// Delete a group with id
router.delete("/:id", Groups.delete);
  
// Delete all groups
router.delete("/", Groups.deleteAll);
  
   
module.exports = router;