import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: false
  },
  description: {
    type: String,
    required: true,
  },
  requirements: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: false,
  },
  postedDate: {
    type: Date,
    default: Date.now,
  },
  company: {
    type: String,
    required: true,
  },
});

const Job = mongoose.model('Job', jobSchema);

export default Job;
