const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// MongoDB connection
mongoose.connect('mongodb://localhost/job-board-api', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async function () {
  console.log("Connected to MongoDB");

  try {
    // Define paths to JSON files
    const jobsPath = path.join(__dirname, 'mock_data', 'jobs.json');
    const applicationsPath = path.join(__dirname, 'mock_data', 'applications.json');
    const usersPath = path.join(__dirname, 'mock_data', 'users.json');

    // Read JSON files
    const jobsData = JSON.parse(fs.readFileSync(jobsPath, 'utf-8'));
    const applicationsData = JSON.parse(fs.readFileSync(applicationsPath, 'utf-8'));
    const usersData = JSON.parse(fs.readFileSync(usersPath, 'utf-8'));

    // Define Mongoose models
    const Job = mongoose.model('Job', new mongoose.Schema({}, { strict: false }));
    const Application = mongoose.model('Application', new mongoose.Schema({}, { strict: false }));
    const User = mongoose.model('User', new mongoose.Schema({}, { strict: false }));

    // Insert data into collections
    await Job.insertMany(jobsData);
    await Application.insertMany(applicationsData);
    await User.insertMany(usersData);

    console.log("Data imported successfully!");

    // Close the connection
    mongoose.connection.close();
  } catch (error) {
    console.error("Error importing data: ", error);
    mongoose.connection.close();
  }
});
