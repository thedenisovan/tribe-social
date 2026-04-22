import { Router, Request, Response } from 'express';
import { signupValidator } from '../validators/authValidators.js';
import validResult from '../validators/validationResult.js';

const signupRoute = Router();

signupRoute.post(
  '/',
  signupValidator,
  validResult,
  (req: Request, res: Response) => {
    res.status(200).json({ msg: 'signup ok' });
  },
);

export default signupRoute;
