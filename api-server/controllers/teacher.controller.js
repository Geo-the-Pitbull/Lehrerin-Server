const db = require("../models");
const Teacher = db.Teachers;


// Create and Save a new Teacher
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: "Content cannot be empty!" });
    return;
  }

  // Create a new Teacher
  const teacher = new Teacher({
    name: req.body.name,
    address: req.body.address,
    gender: req.body.gender,
    age: req.body.age,
    email_address: req.body.email_address,
    image: req.body.image,
    group_assigned: req.body.group_assigned,
  });

  // Save a Group in the database
  teacher
    .save().then((data) => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some errors occurred while creating this teacher"
      });
    });
};

// Retrieve all Teachers from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

  Teacher.find(condition)
    .then( (data) => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some errors occurred while retrieving the teachers."
      });
    });
};

// Find a single Teacher with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Teacher.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found teacher with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving teacher with id=" + id });
    });
};

// Update a Teacher by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update cannot be empty!"
    });
  }

  const id = req.params.id;

  Teacher.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update teacher with id=${id}. Maybe teacher was not found!`
        });
      } else res.send({ message: "teacher was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating teacher with id=" + id
      });
    });
};

// Delete a teacher with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Teacher.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete teacher with id=${id}. Maybe teacher was not found!`
        });
      } else {
        res.send({
          message: "teacher was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete teacher with id=" + id
      });
    });
};

// Delete all Teachers from the database.
exports.deleteAll = (req, res) => {
  Teacher.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} All teachers were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some errors occurred while removing all teachers."
      });
    });
};

