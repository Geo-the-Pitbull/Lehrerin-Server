const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.Groups = require("./group.model");
db.Teachers = require("./teacher.model");
db.Students = require("./student.model");
db.Attendances = require("./attendance.model");
db.Notes = require("./note.model");
db.AttDates = require("./attDate.model");

module.exports = db;