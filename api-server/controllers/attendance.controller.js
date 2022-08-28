const db = require("../models");
const Attendance = db.Attendances;


// Create and Save a new Attendance
exports.create = (req, res) => {
  // Validate request
  if (!req.body.att_date) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create an Attendance
  const attendance = new Attendance({
    att_date: req.body.att_date,
    student_name: req.body.student_name,
    student_group: req.body.student_group,
    teacher_name: req.body.teacher_name,
    attendance_status: req.body.attendance_status ? req.body.attendance_status : false
  });

  // Save an Attendance in the database
  attendance
    .save().then((data) => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some errors occurred while creating this Attendance"
      });
    });
};

// Retrieve all Attendances from the database.
exports.findAll = (req, res) => {
  const att_date = req.query.att_date;
  var condition = att_date ? { att_date: { $regex: new RegExp(att_date), $options: "i" } } : {};

  Attendance.find(condition)
    .then( (data) => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some errors occurred while retrieving the Attendances."
      });
    });
};

// Find a single Attendance with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Attendance.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Attendance with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Attendance with id=" + id });
    });
};

// Update an Attendance by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update cannot be empty!"
    });
  }

  const id = req.params.id;

  Attendance.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Attendance with id=${id}. Maybe attendance was not found!`
        });
      } else res.send({ message: "Attendance was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Attendance with id=" + id
      });
    });
};

// Delete an Attendance with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Attendance.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Attendance with id=${id}. Maybe Attendance was not found!`
        });
      } else {
        res.send({
          message: "Attendance was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Attendance with id=" + id
      });
    });
};

// Delete all Attendances from the database.
exports.deleteAll = (req, res) => {
  Attendance.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} All Attendances were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some errors occurred while removing all Attendances."
      });
    });
};