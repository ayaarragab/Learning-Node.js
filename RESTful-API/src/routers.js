import * as helpers from "./neededImports.js";

const router = helpers.Router();

/**
 * Users endpoints
 */
router.get('/users', helpers.handleErrors, helpers.retrieveAllUsers);
router.get('/user', helpers.body('name').exists().isString(), helpers.handleErrors, helpers.retrieveUser)


/**
 * Applications endpoints
 */
router.get('/applications', helpers.handleErrors, helpers.getApplications);
router.delete('/applications', helpers.handleErrors, helpers.deleteApplications);
router.get('/application/:jobId', helpers.handleErrors, helpers.validateApplication, helpers.getApplication);
router.post('/application/:jobId', helpers.handleErrors, helpers.validateApplication, helpers.createApplication);
router.delete('/application/:jobId', helpers.handleErrors, helpers.validateApplication, helpers.deleteApplication);


/**
 * Jobs endpoints
 */
router.get('/alljobs', helpers.handleErrors, helpers.getAllJobs);

/**
 * Company endpoints
 */
router.get('/companies', helpers.handleErrors, helpers.getAllCompanies) // ✔
router.get('/company', helpers.companyValidationsGET, helpers.handleErrors, helpers.getCompanyInfo); // ✔

router.post('/company', helpers.companyValidationsPOST, helpers.handleErrors, helpers.isCEO, helpers.createCompany); // ✔
router.put('/company', helpers.handleErrors, helpers.isCEO, helpers.updateCompanyInfo); // ✔
router.delete('/company', helpers.handleErrors, helpers.isCEO, helpers.deleteCompany); // ✔


router.post('/company/jobs', helpers.isEligible , helpers.jobValidationsPOST, helpers.handleErrors, helpers.createJob); // ✔
router.put('/company/jobs', helpers.isEligible, helpers.handleErrors, helpers.updateJob); // ✔
router.delete('/company/jobs', helpers.isEligible, helpers.handleErrors, helpers.jobValidationsGET, helpers.deleteJob); // ✔
router.get('/company/jobs', helpers.handleErrors, helpers.jobValidationsGET, helpers.getCompanyJobs); // ✔
router.get('/:companyName/:jobTitle', helpers.handleErrors, helpers.getJob); // ✔


router.get('company/employees', helpers.handleErrors, /*getCompanyEmployees*/);
router.post('company/employees', helpers.handleErrors, /*addEmployee*/);
router.put('company/employees', helpers.handleErrors, /*UpdateEmployeeInfo*/);
router.delete('company/employees', helpers.handleErrors, /*deleteEmployee*/);

export default router;
