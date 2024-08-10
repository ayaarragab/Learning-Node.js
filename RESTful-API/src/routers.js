/**
 * Every route in this routes is protected because of the protect 
   middleware (check serverUsingExpress.js and handlers.js)
*/
import Router from "express";
import { handleErrors, validateApplication, onlyForCEO } from "./modules/middlewares.js";
import { body } from "express-validator";
import {getAllJobs, jobValidations, createJob} from "./handlers/job.js";
import { retrieveUser, retrieveAllUsers } from "./handlers/user.js";
import { getApplications, deleteApplications, getApplication, createApplication, deleteApplication } from "./handlers/application.js";


const router = Router();

/**
 * Users endpoints
 */
router.get('/users', handleErrors, retrieveAllUsers);
router.get('/user', body('name').exists().isString(), handleErrors, retrieveUser)


/**
 * Applications endpoints
 */
router.get('/applications', handleErrors, getApplications);
router.delete('/applications', handleErrors, deleteApplications);
router.get('/application/:jobId', handleErrors, validateApplication, getApplication);
router.post('/application/:jobId', handleErrors, validateApplication, createApplication);
router.delete('/application/:jobId', handleErrors, validateApplication, deleteApplication);


/**
 * Jobs endpoints
 */
router.get('/alljobs', handleErrors, getAllJobs);
router.post('/jobs', onlyForCEO, handleErrors , jobValidations, createJob);


/**
 * Company endpoints
 */
router.route('/company', handleErrors)
router.get('/company', handleErrors)
router.post('/company', handleErrors)
router.put('/company', handleErrors)
router.delete('/company', handleErrors)

router.get('/company/jobs', handleErrors)
router.post('/company/jobs', handleErrors)
router.put('/company/jobs', handleErrors)
router.delete('/company/jobs', handleErrors)

router.get('company/:companyId/employees', handleErrors)
router.post('company/:companyId/employees', handleErrors)
router.put(('company/:companyId/employees', handleErrors));
router.delete('company/:companyId/employees', handleErrors);

export default router;
