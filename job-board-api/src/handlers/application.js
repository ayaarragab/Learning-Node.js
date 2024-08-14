import Job from "../../models/job.js";
import Application from "../../models/application.js";

export const getApplications = async(request, response) => {
    try {
        const user = request.user;
                    
        try {
            const userApplications = await Application.find({ applicant: user.id });
            response.status(200).json({data:[userApplications], success: true, message: "Here're your aplications"});
        } catch (error) {            
            response.status(500).json({data:[], success: false, message: "Server issue"});
        }
    } catch (error) {
        response.status(401).json({data:[], success: false, message: "Please signin or register first"});
    }
}

export const deleteApplications = async(request, response) => {
    try {
        const user = request.user;
                    
        try {
            await Application.deleteMany({ applicant: user.id });
            response.status(200).json({data:[], success: true, message: "Your applications have been canceled"});
        } catch (error) {
            response.status(500).json({data:[], success: false, message: "Server issue"});
        }
    } catch (error) {
        response.status(401).json({data:[], success: false, message: "please signin or register first"});
    }
}


export const getApplication = async (request, response) => {
    const {jobId} = request.params;
    try {
        const job = await Job.findById(jobId);
        try {
            const application = await Application.findOne({job: jobId, applicant: request.user._id});
            
            if (application) {
                response.status(200).json({data:[application], success: true, message: `Here's your application in ${job.title}`, application});
            }
            else {
                response.status(400).json({data:[], success: false, message: `You didn't apply for the ${job.title} position or you may have deleted it`}); 
            }
        } catch (error) {
            response.status(500).json({data:[], success: false, message: `Server Issue/cannot load the application`});   
        }
    } catch (error) {
        response.status(500).json({data:[], success: false, message: `Server Issue/cannot load the job`}); 
    } 
}

export const createApplication = async (req, res) => { // **** DONE ****
    const { resume, coverLetter } = req.body;
    const { jobId } = req.params;

    try {
        const job = await Job.findById(jobId);
        if (!job)
            return res.status(404).json({data:[], success: false, message: 'Job not found' });

        const user = req.user;
        if (!user) {
            return res.status(404).json({ data:[], success: false, message: 'User not found' });
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
        res.status(200).json({data:[dataToBeSent], success:true, message: `You successfully applied to ${job.title} position`});
    } catch (error) {        
        res.status(500).json({ data:[], success: false, message: 'Failed to create application' });
    }
}

export const deleteApplication = async (request, response) => {
    const {jobId} = request.params;
    try {
        const job = await Job.findById(jobId);
        try {
            const application = await Application.findOne({job: jobId, applicant: request.user._id});
            await application.deleteOne();
            response.status(200).json({data:[], success: true, message: `Your application in ${job.title} has been deleted`});
        } catch (error) {
            response.status(400).json({data:[], success: false, message: `You didn't apply for the ${job.title} position`});   
        }
    } catch (error) {
        response.status(404).json({data:[], success: false, message: "This job doesn't exist"});
    } 
}
