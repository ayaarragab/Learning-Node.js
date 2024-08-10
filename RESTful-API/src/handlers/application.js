import Job from "../../models/job.js";
import { Company } from "../../models/company.js";
import User from "../../models/user.js";
import Application from "../../models/application.js";

export const getApplications = async(request, response) => {
    try {
        const user = request.user;
                    
        try {
            const userApplications = await Application.find({ applicant: user.id });
            response.status(200).json(userApplications);
        } catch (error) {
            console.log(error);
            
            response.status(500).json({message: "Server issue"});
        }
    } catch (error) {
        response.status(401).json({message: "please signin or register first"});
    }
}

export const deleteApplications = async(request, response) => {
    try {
        const user = request.user;
                    
        try {
            await Application.deleteMany({ applicant: user.id });
            response.status(200).json({message: "Your applications have been canceled"});
        } catch (error) {
            console.log(error);
            response.status(500).json({message: "Server issue"});
        }
    } catch (error) {
        response.status(401).json({message: "please signin or register first"});
    }
}

export const getApplication = async (request, response) => { // **** DONE ****
    const {jobId} = request.params;
    try {
        const job = await Job.findById(jobId);
        try {
            const application = await Application.findOne({job: jobId, applicant: request.user._id});
            
            if (application) {
                response.status(200).json({message: `Here's your application in ${job.title}`, application});
            }
            else {
                response.status(400).json({message: `You didn't apply for the ${job.title} position or you may have deleted it`}); 
            }
        } catch (error) {
            response.status(400).json({message: `You didn't apply for the ${job.title} position`});   
        }
    } catch (error) {
        response.json({message: "This job doesn't exist"});
    } 
}

export const createApplication = async (req, res) => { // **** DONE ****
    const { resume, coverLetter } = req.body;
    const { jobId } = req.params;

    try {
        const job = await Job.findById(jobId);
        if (!job)
            return res.status(404).json({ error: 'Job not found' });

        const user = req.user;
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        const application = await Application.create({
            applicant: user.id,
            resume,
            coverLetter,
            job: job._id,
            status: 'pending',
        });
        application.save();
        const dataToBeSent = {application, jobTitle: job.title}
        res.status(200).json({dataToBeSent, message: `You successfully applied to ${job.title} position`});
    } catch (error) {
        console.log(error);
        
        res.status(500).json({ error: 'Failed to create application' });
    }
}

export const deleteApplication = async (request, response) => { // **** DONE ****
    const {jobId} = request.params;
    try {
        const job = await Job.findById(jobId);
        try {
            const application = await Application.findOne({job: jobId, applicant: request.user._id});
            await application.deleteOne();
            response.status(200).json({message: `Your application in ${job.title} has been deleted`});
        } catch (error) {
            response.status(400).json({message: `You didn't apply for the ${job.title} position`});   
        }
    } catch (error) {
        response.json({message: "This job doesn't exist"});
    } 
}
