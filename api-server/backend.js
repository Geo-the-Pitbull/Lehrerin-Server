const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const db = require("./models");

const PORT = process.env.PORT || 4040

const groupRoute = require('./routes/group.route');
const teacherRoute = require('./routes/teacher.route');
const studentRoute = require('./routes/student.route');
const attendanceRoute = require('./routes/attendance.route');
const noteRoute = require('./routes/note.route');

var corsOptions = {
  origin: "http://localhost:4200"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// Setting Route middleware
app.use('/api/Lehrerin/Groups', groupRoute),
app.use('/api/Lehrerin/Teachers', teacherRoute),
app.use('/api/Lehrerin/Students', studentRoute),
app.use('/api/Lehrerin/Attendances', attendanceRoute),
app.use('/api/Lehrerin/Notes', noteRoute),

// set port, listen for requests
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});