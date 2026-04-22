import { Router, Request, Response } from 'express';
import { signupValidator } from '../validators/authValidators.js';
import validResult from '../validators/validationResult.js';
import registerUser from '../controllers/registerUser.js';

const signupRoute = Router();

signupRoute.post('/', signupValidator, validResult, registerUser);

export default signupRoute;
