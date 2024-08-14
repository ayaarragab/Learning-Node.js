import mongoose from "mongoose";

export const ApplicationSchema = new mongoose.Schema({
      applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      },
      resume: {
        type: String, // URL to the resume file
        required: true,
      },
      coverLetter: {
        type: String,
        required: false,
      },
      appliedDate: {
        type: Date,
        default: Date.now,
      },
      job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',  // Referencing the Job model
        required: true,
      },
      status: {
        type: String,
        enum: ['pending', 'reviewed', 'accepted', 'rejected'],
        default: 'pending',
      },
})
const Application = mongoose.model('Application', ApplicationSchema);
export default Application;
