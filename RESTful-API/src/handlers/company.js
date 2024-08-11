import {Company} from "../../models/company.js";
import { body } from "express-validator";

/*
 * Handlers 
 */

export const getCompanyInfo = async(req, res) => {
  try {
    const id = req.body.id;

    const company = await Company.findById(id);
    if (!company)
      res.status(404).json({data:[], success: false, message:"This company doesn't exist"});
    else
      res.status(200).json({data:company, success: true, message:`Here's ${company.name} information`});
  } catch (error) {
    console.log(error);
    
    res.status(501).json({data:[], success: false, message:"Error occured while searching for the company"});
  }
}

export const getAllCompanies = async(req, res) => {
  try {
    const companies = await Company.find({});
    if (!companies)
      res.status(404).json({data:[], success: false, message:"This company doesn't exist"});
    else
      res.status(200).json({data:companies, success: true, message:"Here're all the companies"});
  } catch (error) {
    res.status(501).json({data:[], success: false, message:"Error occured while retrieving all companies"});
  }
}

/*
 * Validations
 */
export const companyValidations = [body('id').isString().exists()]
