import {Company} from "../../models/company.js";
import { body } from "express-validator";
import User from "../../models/user.js";

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

export const createCompany = async(req, res) => {
  const {name, location, employees} = req.body;
  try {
    const company = await Company.create({name, location, employees});
    company.save();
    res.status(200).json({data:[company], success:true, message:"Company created"});
  } catch (error) {
    res.status(500).json({data:[], success:false, message:"Error occured while Company creation"});
  }  
}

/**
 * Request format
 * {
    name: "",
    update: {
    name:"",
    ...
    }
* }
 */

export const updateCompanyInfo = async (req, res) => {
    const toUpdate = ['location', 'employees', 'name'];
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
        const updatedCompany = await Company.findOneAndUpdate({name: req.body.name}, { $set: updateData }, { new: true });

        if (!updatedCompany) {
            return res.status(404).json({ success: false, message: 'Company not found.' });
        }

        res.status(200).json({ data: [updatedCompany], success: true, message: "Your company's info updated successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to update company information.' });
    }
};

export const deleteCompany = async(req, res) => {
  try {
    const id = req.body.id;

    const company = await Company.findById(id);
    if (!company)
      res.status(404).json({data:[], success: false, message:"This company doesn't exist"});
    else {
      await company.deleteOne();
      res.status(200).json({data:[], success: true, message:`$Company ${company.name} deleted`});
    }
  } catch (error) {    
    res.status(501).json({data:[], success: false, message:"Error occured while searching for the company"});
  }
}

export const getCompanyEmployees = async(req, res) => {
  try {    
    const employees = await User.find({companyName: req.params.companyname});
    if (employees[0]) {
      res.status(200).json({data:employees, success: true, message:`Here're all employees in ${req.params.companyname} company`});
    }
    else {
      res.status(200).json({data:[], success: true, message:`No employees in ${req.params.companyname} company`});
    }
  } catch (error) {
    res.status(500).json({data:[], success: false, message:`Error occured while loading ${req.params.companyname} company employees`});    
  }
}


export const deleteEmployee = async(req, res) => {
  try {
    const employee = await User.findById(req.body.employeeId);
    if (employee.companyName === req.params.companyName) {
      await employee.updateOne({companyName: "N/A"});
      res.status(200).json({data:[], success:true, message: `Employee removed from ${req.params.companyName} company`});
    }
  } catch (error) {
    res.status(500).json({data:[], success:false, message: `Cannot remove this employee`});
  }
}

/*
 * Validations
 */
export const companyValidationsGET = [body('id').isString().exists()]

export const companyValidationsPOST = [
  body('name').isString().exists(),
  body('location').isString().exists(),
  body('employees').isNumeric().exists()
]
