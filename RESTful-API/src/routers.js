/**
 * Every route in this routes is protected because of the protect 
   middleware (check serverUsingExpress.js and handlers.js)
*/
import Router from "express";
import { handleErrors, validateApplication, isEligible, isCEO } from "./modules/middlewares.js";
import { body } from "express-validator";
import {getAllJobs, jobValidationsGET, jobValidationsPOST, createJob, updateJob, deleteJob, getJob} from "./handlers/job.js";
import { retrieveUser, retrieveAllUsers } from "./handlers/user.js";
import { getApplications, deleteApplications, getApplication, createApplication, deleteApplication } from "./handlers/application.js";
import { getCompanyInfo, companyValidationsGET, getAllCompanies, createCompany, companyValidationsPOST, updateCompanyInfo, deleteCompany } from "./handlers/company.js";


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

/**
 * Company endpoints
 */
router.get('/companies', handleErrors, getAllCompanies) // ✔
router.get('/company', companyValidationsGET, handleErrors, getCompanyInfo); // ✔

router.post('/company', companyValidationsPOST, handleErrors, isCEO, createCompany); // ✔
router.put('/company', handleErrors, isCEO, updateCompanyInfo); // ✔
router.delete('/company', handleErrors, isCEO, deleteCompany); // ✔


router.post('/company/jobs', isEligible , jobValidationsPOST, handleErrors, createJob); // ✔
router.put('/company/jobs', isEligible, handleErrors, updateJob); // ✔
router.delete('/company/jobs', isEligible, handleErrors, /*deleteJob*/);
router.get('/company/jobs', isEligible, handleErrors, /*getCompanyJobs*/);

router.get('company/employees', handleErrors, /*getCompanyEmployees*/);
router.post('company/employees', handleErrors, /*addEmployee*/);
router.put('company/employees', handleErrors, /*UpdateEmployeeInfo*/);
router.delete('company/employees', handleErrors, /*deleteEmployee*/);

export default router;
