import { validationResult  } from "express-validator";

/*
    express validator middleware w/ set of validation rules
    - request received by Express route -> check request (qparams, body data, route params)
 */
const validate = (req, res, next) => {
    const errors = validationResult(req); //return Result obj

    if (!errors.isEmpty()) return res.status(400).json({
        message: errors.array()[0].msg
    });

    next();

}

export default { validate };