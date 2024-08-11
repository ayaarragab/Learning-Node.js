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
import { getCompanyInfo, companyValidations, getAllCompanies } from "./handlers/company.js";


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
// will be ommitted, company/job instead
router.post('/jobs', onlyForCEO, handleErrors , jobValidations, createJob);


/**
 * Company endpoints
 */
router.get('/companies', handleErrors, getAllCompanies) // ✔
router.get('/company', companyValidations, handleErrors, getCompanyInfo); // ✔
router.post('/company', handleErrors, /*createCompany*/);
router.put('/company', handleErrors, /*updateCompanyInfo*/);
router.delete('/company', handleErrors, /*deleteCompany*/);

router.get('/company/jobs', handleErrors, /*getCompanyJobs*/);
router.post('/company/jobs', handleErrors, createJob);
router.put('/company/jobs', handleErrors, /*updateJob*/);
router.delete('/company/jobs', handleErrors, /*deleteJob*/);

router.get('company/employees', handleErrors, /*getCompanyEmployees*/);
router.post('company/employees', handleErrors, /*addEmployee*/);
router.put('company/employees', handleErrors, /*UpdateEmployeeInfo*/);
router.delete('company/employees', handleErrors, /*deleteEmployee*/);

export default router;
