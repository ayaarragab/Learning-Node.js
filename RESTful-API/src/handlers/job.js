import Job from "../../models/job.js";
import { Company } from "../../models/company.js";
import { body } from "express-validator";

/**
 * Handlers
 */

const getAllJobs = async (request, response) => {
    try {
        const jobs = await Job.find({});
        response.status(200).json({data: jobs, success: true ,message: "Here's all the available jobs"});
    } catch (error) {
        response.status(501).json({data: [], success: false ,message: "Server error"});
    }
}





const createJob = async(request, response) => {
    const { title, description, requirements, location, salary, company } = request.body;

    try {
        const companyExists = await Company.findOne({ name: company });
    
        if (!companyExists) {
            return response.status(404).json({ success: false, message: "Please enter a valid company" });
        }
    
        const job = await Job.create({
            title,
            description,
            requirements,
            location,
            salary,
            company
        });
        job.save();
        response.status(200).json({ success: true, message: "Job created successfully" });
        
    } catch (error) {
        console.error(error);
        response.status(500).json({ success: false, message: "An error occurred while creating the job" });
    }
}

/**
 * Validations
 */

const jobValidations = 
[
    body('title').isString().exists(),
    body('description').isString().exists(),
    body('requirements').isString().exists(),
    body('location').isString().exists(),
    body('salary').isNumeric().exists(),
    body('company').isString().exists()
]

export { getAllJobs, jobValidations, createJob};
