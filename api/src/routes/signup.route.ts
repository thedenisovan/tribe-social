import { Router } from 'express';
import { signupValidator } from '../validators/authValidators.js';
import validResult from '../validators/validationResult.js';

const signupRoute = Router();

signupRoute.post('/', signupValidator, validResult, (req, res) => {
  res.send('hello');
});

export default signupRoute;
