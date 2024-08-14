import Router from "express";
import { handleErrors, validateApplication, isEligible, isCEO } from "./modules/middlewares.js";
import { body } from "express-validator";
import { getAllJobs, jobValidationsGET, jobValidationsPOST, createJob, updateJob, deleteJob, getCompanyJobs, getJob} from "./handlers/job.js";
import { retrieveUser, retrieveAllUsers } from "./handlers/user.js";
import { getApplications, deleteApplications, getApplication, createApplication, deleteApplication } from "./handlers/application.js";
import { getCompanyInfo, deleteEmployee, getCompanyEmployees, companyValidationsGET, getAllCompanies, createCompany, companyValidationsPOST, updateCompanyInfo, deleteCompany } from "./handlers/company.js";

export { getCompanyInfo, deleteEmployee, getCompanyEmployees, companyValidationsGET, getAllCompanies, createCompany, companyValidationsPOST, updateCompanyInfo, deleteCompany, retrieveUser, retrieveAllUsers, Router, handleErrors, getApplications, deleteApplications, getApplication, createApplication, deleteApplication, validateApplication, isEligible, isCEO, body, getAllJobs, jobValidationsGET, jobValidationsPOST, createJob, updateJob, deleteJob, getCompanyJobs, getJob}
