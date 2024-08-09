import Router from "express";
import User from "../models/user.js";
import {body} from "express-validator";
import { handleErrors, validateApplication } from "./modules/middlewares.js";
import Application from "../models/application.js";
import Job from "../models/job.js";
import mongoose from "mongoose";


const router = Router();
/**
 * Steps for input validations:
 *  1- Identify where the input validtions need to exist
 *  2- Identify resources that you'll need to crud
 *  3- create input validators by expressvalidators library
 */


/**
 * Every route in this routes is protected because of the protect middleware (check serverUsingExpress.js and handlers.js)
 */
/**
 * Users routes
 */
router.route('/users')
    .get(async (request, response) => {
        try {
            const users = await User.find({});
            console.log(users); // No need to parse; `users` is already a JavaScript object
            response.json(users);
        } catch (error) {
            console.error(error);
            response.status(500).json({ message: 'Error fetching users' });
        }
    })
    .put((request, response) => {
        // Handle updating all users
        response.json({ message: "Users updated" });
    })
    .delete((request, response) => {
        // Handle deleting all users
        response.json({ message: "Users deleted" });
    });

/**
 * More oragnized way is to put input validators in  a specific module
 */
router.route('/userProfile', body('name').isString, handleErrors) // means req.body should have name field
    .put((request, response) => {
    })
    .post((request, response) => {
        // Not typically used for a single user, but if needed:
        response.json({ message: `Post to user with ID: ${request.params.id}` });
    })
    .get(async (request, response) => { // ***** DONE *****
        const isExist = await User.findOne({name: request.body.name});
        if (isExist) {
            response.json({message: `Welcome to ${request.body.name} profile
                ${request.body.name}'s email is ${isExist.email}`});
    }
    })
    .delete((request, response) => {
        // Handle deleting a specific user by ID
        response.json({ message: `Delete user with ID: ${request.params.id}` });
    });



/**
 * Applications routes
 */

// ✔✔ DONE ✔✔
router.route('/applications')
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
                const userApplications = await Application.deleteMany({ applicant: user.id });
                response.status(200).json({message: "Your applications have been canceled"});
            } catch (error) {
                console.log(error);
                response.status(500).json({message: "Server issue"});
            }
        } catch (error) {
            response.status(401).json({message: "please signin or register first"});
        }
    });
// ✔✔ DONE ✔✔


// ✔✔ DONE ✔✔
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
            console.log(user.id);
            
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
                console.log(job);
                await application.deleteOne();
                response.status(200).json({message: `Your application in ${job.title} has been deleted`});
            } catch (error) {
                response.status(400).json({message: `You didn't apply for the ${job.title} position`});   
            }
        } catch (error) {
            response.json({message: "This job doesn't exist"});
        } 
    });
// ✔✔ DONE ✔✔


router.route('/:userId/applications')
    .get((request, response) => {
    })

    .post((request, response) => {
    })

    .put((request, response) => {
    })

    .delete((request, response) => {
    });

/**
 * Jobs routes
 */


router.route('/jobs')
    .get((request, response) => {
        // Handle getting all jobs
        response.json({ message: "Get all jobs" });
    })

    .post((request, response) => {
        // Handle creating a job
        response.json({ message: "Job created" });
    })

    .put((request, response) => {
        // Handle updating all jobs
        response.json({ message: "Jobs updated" });
    })

    .delete((request, response) => {
    });


router.route('/jobs/:id')
    .get((request, response) => {
    })

    .post((request, response) => {
    })

    .put((request, response) => {
    })

    .delete((request, response) => {
    });


router.route('/jobs/:id/employees')
    .get((request, response) => {
    })

    .post((request, response) => {
    })

    .put((request, response) => {
    })

    .delete((request, response) => {
    });

export default router;
