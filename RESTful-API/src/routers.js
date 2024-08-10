import Router from "express";
import User from "../models/user.js";
import { handleErrors, validateApplication, onlyForCEO } from "./modules/middlewares.js";
import Application from "../models/application.js";
import Job from "../models/job.js";
import { Company } from "../models/company.js";
import { error } from "console";


const router = Router();
/**
 * Steps for input validations:
 *  1- Identify where the input validtions need to exist
 *  2- Identify resources that you'll need to crud
 *  3- create input validators by expressvalidators library
 * 
 * Every route in this routes is protected because of the protect 
   middleware (check serverUsingExpress.js and handlers.js)
*/

/**
 * Users routes
 */
router.route('/users') // when you fetch data of all users
    .get(async (request, response) => { // **** Done ****
        try {
            const users = await User.find({});
            response.json(users);
        } catch (error) {
            console.error(error);
            response.status(500).json({ message: 'Error fetching users' });
        }
    })


// ✔✔ DONE ✔✔ //
router.route('/user', handleErrors) // when you fetch data of another user
    .get(async (request, response) => { // ***** DONE *****
        const isExist = await User.findOne({name: request.body.name});
        if (isExist) {
            response.json(isExist);
    }
    })
// ✔✔ DONE ✔✔ //


/**
 * Applications routes
 */

// ✔✔ DONE ✔✔ //
router.route('/applications', handleErrors)
    .get(async (request, response) => { // **** Done ****
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
    })
    .delete(async (request, response) => {
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
    });
// ✔✔ DONE ✔✔ //


// ✔✔ DONE ✔✔ //
router.route('/application/:jobId', handleErrors, validateApplication)
    .get(async (request, response) => { // **** DONE ****
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
    })

    .post(async (req, res) => { // **** DONE ****
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
    })

    .delete(async (request, response) => { // **** DONE ****
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
    });
// ✔✔ DONE ✔✔ //




/**
 * Jobs routes
 */


router.route('/jobs', handleErrors)
    .get(async (request, response) => {
        try {
            const jobs = await Job.find({});
            response.status(200).json({data: jobs, success: true ,message: "Here's all the available jobs"});
        } catch (error) {
            response.status(501).json({data: [], success: false ,message: "Server error"});
        }
    })


// Has a issue that onlyForCEO doesn't work properly
router.route('/jobs', onlyForCEO, handleErrors)
    .post(async(request, response) => {
        const {title, description, requirements, location, salary, company} = request.body;
        
        try {
            const companyE = await Company.findOne({name: company});
            if (companyE) {
                const job = await Job.create(
                    {
                        title,
                        description,
                        requirements,
                        location,
                        salary,
                        company
                    });
                job.save();
                response.status(200).json({data:[], success: true, message:"Your Job has been created"});
            } else {
                response.status(404).json({data:[], success: false, message: "Please enter a company"}); 
            }
        } catch (error) {
            console.log(error);
            
            response.status(404).json({data:[], success: false, message: "This company doesn't exist"});
        }
    })

    .put((request, response) => {
        // Handle updating all jobs
        response.json({ message: "Jobs updated" });
    })

    .delete((request, response) => {
    });


router.route('/jobs/:id', handleErrors)
    .get((request, response) => {
    })

    .post((request, response) => {
    })

    .put((request, response) => {
    })

    .delete((request, response) => {
    });


/**
 * When Implementing company model
 */
router.route('company/:companyId/employees', handleErrors)
    .get((request, response) => {
    })

    .post((request, response) => {
    })

    .put((request, response) => {
    })

    .delete((request, response) => {
    });

export default router;
