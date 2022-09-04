const db = require("../models");
const Group = db.Groups;


// Create and Save a new Group
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: "Content cannot be empty!" });
    return;
  }

  // Create a new Group
  const group = new Group({
    name: req.body.name,
  });

  // Save a Group in the database
  group
    .save().then((data) => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some errors occurred while creating this group"
      });
    });
};

// Retrieve all Groups from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

  Group.find(condition)
    .then( (data) => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some errors occurred while retrieving the groups."
      });
    });
};

// Find a single Group with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Group.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found group with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving group with id=" + id });
    });
};

// Update a Class by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update cannot be empty!"
    });
  }

  const id = req.params.id;

  Group.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update group with id=${id}. Maybe group was not found!`
        });
      } else res.send({ message: "group was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating group with id=" + id
      });
    });
};

// Delete a group with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Group.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete group with id=${id}. Maybe group was not found!`
        });
      } else {
        res.send({
          message: "group was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete group with id=" + id
      });
    });
};

// Delete all Classes from the database.
exports.deleteAll = (req, res) => {
  Group.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} All groups were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some errors occurred while removing all groups."
      });
    });
};

