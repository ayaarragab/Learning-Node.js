import mongoose from "mongoose";

export const ApplicationSchema = new mongoose.Schema({
    applicantName: {
        type: String,
        required: true,
      },
      applicantEmail: {
        type: String,
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
        ref: 'Job',
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
