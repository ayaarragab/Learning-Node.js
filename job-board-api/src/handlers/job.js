import { Company } from "../../models/company.js";
import Job from "../../models/job.js";
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
        const job = await Job.create({
            title,
            description,
            requirements,
            location,
            salary,
            company
        });
        job.save();
        response.status(200).json({ data:[job], success: true, message: "Job created successfully" });
        
    } catch (error) {
        
        
        response.status(500).json({ success: false, message: "An error occurred while creating the job" });
    }
}

/**
 * Request format
 * {
    title: "",
    company: ""
    update: {
    name:"",
    ...
    }
* }
 */

export const updateJob = async(req, res) => {
    const toUpdate = ['location', 'title', 'salary', 'company', 'description', 'requirements'];
    const updateData = {};

    // Iterate through req.body keys and add them to updateData if they are in toUpdate
    for (const key in req.body.update) {
        if (toUpdate.includes(key)) {
            updateData[key] = req.body.update[key];
        }
    }

    if (Object.keys(updateData).length === 0)
        return res.status(400).json({ success: false, message: 'No valid fields to update.' });

    try {
        const updatedCompany = await Job.findOneAndUpdate({title: req.body.title, company: req.body.company}, { $set: updateData }, { new: true });

        if (!updatedCompany) {
            return res.status(404).json({ success: false, message: 'Job not found.' });
        }

        res.status(200).json({ data: [updatedCompany], success: true, message: "Your job's info updated successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to update job information.' });
    }
}

export const deleteJob = async(request, response) => {
    const {id} = request.body;
    try {
        const job = Job.findById(id);
        job.deleteOne();
        response.status(200).json({data:[], success: true, message:"Job deleted successfully"});
    } catch (error) {
        response.status(404).json({data:[], success: false, message:"Job not found"});
    }
}

export const getJob = async(request, response) => {
    const {companyName, jobTitle} = request.params;
    try {
        if (companyName && jobTitle) {
            const job = await Job.findOne({title: jobTitle, company: companyName});
            response.status(200).json({data:[job], success: true, message:`Job Here's job (${job.title})`});
        } else {
            response.status(200).json({data:[], success: false, message:`Invalid arguments`});
        }
    } catch (error) {
        response.status(404).json({data:[], success: false, message:"Job not found"});
    }
}
/**
 * request:
 * {
 *  "id": "" of
 * }
 */
export const getCompanyJobs = async(req, res) => {
    const {id} = req.body;
    
    try {
        const company = await Company.findById(id);
        if (company) {
            const jobs = await Job.find({company: company.name});
            if (jobs != []) {
                res.status(200).json({data:[jobs], success: true, message:`Here're all the jobs of ${company.name} company`});
            }
            else {
                res.status(200).json({data:[], success: false, message:`There's no available jobs in ${company.name}`});
            }
        } else {
            res.status(404).json({data:[], success: false, message: "company not found"});
        }
    } catch (error) {
        console.log(error);
        
        res.status(500).json({data:[], success: false, message:`Error in getting the company`});        
    }
}

/**
 * Validations
 */

const jobValidationsPOST = 
[
    body('title').isString().exists(),
    body('description').isString().exists(),
    body('requirements').isString().exists(),
    body('location').isString().exists(),
    body('salary').isNumeric().exists(),
    body('company').isString().exists()
]

const jobValidationsGET = 
[
    body('id').isString().exists()
]

export { getAllJobs, jobValidationsPOST, jobValidationsGET, createJob};
