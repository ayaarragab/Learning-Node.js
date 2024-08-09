import { validationResult, body } from "express-validator";

export const handleErrors = (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty) {
        response.status(400);
        response.json({errors: errors.array()});
    }
    else
        next();
}

export const validateApplication = [
    body('applicantName').isString().withMessage('Applicant name must be a string'),
    body('applicantEmail').isString().withMessage('Applicant email must be a string'),
    body('resume').isString().withMessage('Resume must be a string'),
    body('coverLetter').isString().withMessage('Cover letter must be a string'),
    body('jobTitle').isString().withMessage('Job title must be a string'),
]
