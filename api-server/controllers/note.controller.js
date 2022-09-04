const db = require("../models");
const Note = db.Notes;


// Create and Save a new Note
exports.create = (req, res) => {
  // Validate request
  if (!req.body.note_date) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Note
  const note = new Note({
    note_date: req.body.note_date,
    student_name: req.body.student_name,
    student_group: req.body.student_group,
    teacher_name: req.body.teacher_name,
    activity_description: req.body.activity_description,
    mark_or_score: req.body.mark_or_score,
    comments: req.body.comments,
  });

  // Save a Note in the database
  note
    .save().then((data) => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some errors occurred while creating this Note"
      });
    });
};

// Retrieve all Notes from the database.
exports.findAll = (req, res) => {
  const student_name = req.query.student_name;
  var condition = student_name ? { student_name: { $regex: new RegExp(student_name), $options: "i" } } : {};

  Note.find(condition)
    .then( (data) => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some errors occurred while retrieving the Notes."
      });
    });
};

// Find a single Note with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Note.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Note with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Note with id=" + id });
    });
};

// Update a Note by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update cannot be empty!"
    });
  }

  const id = req.params.id;

  Note.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Note with id=${id}. Maybe Note was not found!`
        });
      } else res.send({ message: "Note was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Note with id=" + id
      });
    });
};

// Delete a Note with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Note.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Note with id=${id}. Maybe Note was not found!`
        });
      } else {
        res.send({
          message: "Note was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Note with id=" + id
      });
    });
};

// Delete all Students from the database.
exports.deleteAll = (req, res) => {
  Note.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} All Notes were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some errors occurred while removing all Notes."
      });
    });
};