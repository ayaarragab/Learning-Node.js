import Router from "express";
import User from "../models/user.js";

const router = Router();

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
    .post(async (request, response) => {
        try {
            const { name, email, password } = request.body;
            const new_user = new User({ name, email, password });
            new_user.save();
            response.json(new_user);
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

router.route('/users/:id')
    .get((request, response) => {
        // Handle getting a specific user by ID
        response.json({ message: `Get user with ID: ${request.params.id}` });
    })
    .post((request, response) => {
        // Not typically used for a single user, but if needed:
        response.json({ message: `Post to user with ID: ${request.params.id}` });
    })
    .put((request, response) => {
        // Handle updating a specific user by ID
        response.json({ message: `Update user with ID: ${request.params.id}` });
    })
    .delete((request, response) => {
        // Handle deleting a specific user by ID
        response.json({ message: `Delete user with ID: ${request.params.id}` });
    });



/**
 * Applications routes
 */
router.route('/applications')
    .get((request, response) => {
        // Handle getting all applications
        response.json({ message: "Get all applications" });
    })
    .post((request, response) => {
        // Handle creating an application
        response.json({ message: "Application created" });
    })
    .put((request, response) => {
        // Handle updating all applications
        response.json({ message: "Applications updated" });
    })
    .delete((request, response) => {
        // Handle deleting all applications
        response.json({ message: "Applications deleted" });
    });

router.route('/applications/:id')
    .get((request, response) => {
        // Handle getting a specific application by ID
        response.json({ message: `Get application with ID: ${request.params.id}` });
    })
    .post((request, response) => {
        // Not typically used for a single application, but if needed:
        response.json({ message: `Post to application with ID: ${request.params.id}` });
    })
    .put((request, response) => {
        // Handle updating a specific application by ID
        response.json({ message: `Update application with ID: ${request.params.id}` });
    })
    .delete((request, response) => {
        // Handle deleting a specific application by ID
        response.json({ message: `Delete application with ID: ${request.params.id}` });
    });

router.route('/:userId/applications')
    .get((request, response) => {
        // Handle getting applications for a specific user
        response.json({ message: `Get applications for user with ID: ${request.params.userId}` });
    })
    .post((request, response) => {
        // Handle creating an application for a specific user
        response.json({ message: `Create application for user with ID: ${request.params.userId}` });
    })
    .put((request, response) => {
        // Handle updating applications for a specific user
        response.json({ message: `Update applications for user with ID: ${request.params.userId}` });
    })
    .delete((request, response) => {
        // Handle deleting applications for a specific user
        response.json({ message: `Delete applications for user with ID: ${request.params.userId}` });
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
        // Handle deleting all jobs
        response.json({ message: "Jobs deleted" });
    });

router.route('/jobs/:id')
    .get((request, response) => {
        // Handle getting a specific job by ID
        response.json({ message: `Get job with ID: ${request.params.id}` });
    })
    .post((request, response) => {
        // Not typically used for a single job, but if needed:
        response.json({ message: `Post to job with ID: ${request.params.id}` });
    })
    .put((request, response) => {
        // Handle updating a specific job by ID
        response.json({ message: `Update job with ID: ${request.params.id}` });
    })
    .delete((request, response) => {
        // Handle deleting a specific job by ID
        response.json({ message: `Delete job with ID: ${request.params.id}` });
    });

router.route('/jobs/:id/employees')
    .get((request, response) => {
        // Handle getting employees for a specific job
        response.json({ message: `Get employees for job with ID: ${request.params.id}` });
    })
    .post((request, response) => {
        // Handle adding an employee to a specific job
        response.json({ message: `Add employee to job with ID: ${request.params.id}` });
    })
    .put((request, response) => {
        // Handle updating employees for a specific job
        response.json({ message: `Update employees for job with ID: ${request.params.id}` });
    })
    .delete((request, response) => {
        // Handle deleting employees for a specific job
        response.json({ message: `Delete employees for job with ID: ${request.params.id}` });
    });

export default router;
