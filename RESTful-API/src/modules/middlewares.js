import { validationResult, body } from "express-validator";
import { Company } from "../../models/company.js";

export const handleErrors = (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty) {
        response.status(400);
        response.json({errors: errors.array()});
    }
    else
        next();
}

export const isEligible = async(req, res, next) => {
    console.log(req.user.companyName);
    
    if (req.user.companyName === "N/A")
    {
        res.status(401).json({data:[], success: false, message: "You're not Eligible to post a job"});
        return;
    }
    try {
        const company = await Company.findOne({name: req.user.companyName})
        const isCompanyMatch = req.user.companyName === company.name;
        const isTitleValid = ['HR', 'HR Manager', 'Talent Acquisition', 'Recruiter', 'CEO'].includes(req.user.professional_title);
        
        if (isCompanyMatch && isTitleValid)
            next();
        else
        {
            res.status(401).json({data:[], success: false, message: "You're 11 not Eligible to post a job"});
            return;
        }
        
    } catch (error) {
        console.log(error);
        
        res.status(401).json({data:[], success: false, message: "Company not found"});
    }    
}

export const isCEO = async(req, res, next) => {
    req.user.professional_title = 'CEO';
    if (req.user.professional_title === 'CEO')
        next();
    else {
        res.status(401).json({data:[], status: false, message:"You are not allowed to add a company"});
        return;
    }
}

export const validateApplication = [
    body('applicantName').isString().withMessage('Applicant name must be a string'),
    body('applicantEmail').isString().withMessage('Applicant email must be a string'),
    body('resume').isString().withMessage('Resume must be a string'),
    body('coverLetter').isString().withMessage('Cover letter must be a string'),
    body('jobTitle').isString().withMessage('Job title must be a string'),
]
