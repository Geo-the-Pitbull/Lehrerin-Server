const db = require("../models");
const AttDate = db.AttDates;


// Create and Save a new Attendance Date
exports.create = (req, res) => {
  // Validate request
  if (!req.body.date) {
    res.status(400).send({ message: "Content cannot be empty!" });
    return;
  }

  // Create a new Attendance Date
  const attdate = new AttDate({
    date: req.body.date,
  });

  // Save an Attendance in the database
  attdate
    .save().then((data) => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some errors occurred while creating this Attendance Date"
      });
    });
};

// Retrieve all Attendance Dates from the database.
exports.findAll = (req, res) => {
  const date = req.query.date;
  var condition = date ? { date: { $regex: new RegExp(date), $options: "i" } } : {};

  AttDate.find(condition)
    .then( (data) => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some errors occurred while retrieving the Attendance Dates."
      });
    });
};

// Find a single Attendance Date with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  AttDate.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Attendance Date with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Attendance Date with id=" + id });
    });
};

// Update an Attendance Date by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update cannot be empty!"
    });
  }

  const id = req.params.id;

  AttDate.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Attendance Date with id=${id}. Maybe Attendance Date was not found!`
        });
      } else res.send({ message: "Attendance Date was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Attendance Date with id=" + id
      });
    });
};

// Delete an Attendance Date with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  AttDate.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Attendance Date with id=${id}. Maybe Attendance Date was not found!`
        });
      } else {
        res.send({
          message: "Attendance Date was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Attendance Date with id=" + id
      });
    });
};

// Delete all Attendance Dates from the database.
exports.deleteAll = (req, res) => {
  AttDate.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} All Attendance Dates were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some errors occurred while removing all Attendance Dates."
      });
    });
};

