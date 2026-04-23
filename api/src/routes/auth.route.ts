import { Router, Request, Response, NextFunction } from 'express';
import {
  signupValidator,
  signinValidator,
} from '../validators/authValidators.js';
import validResult from '../validators/validationResult.js';
import registerUser from '../controllers/registerUser.js';
import passport from 'passport';

const authRoute = Router();

authRoute.post('/signup', signupValidator, validResult, registerUser);
authRoute.post(
  '/signin',
  signinValidator,
  validResult,
  //   passport.authenticate('local'),
  (req: Request, res: Response, next: NextFunction) => {
    try {
      return res.status(200).json({ msg: 'success' });
    } catch (e) {
      next(e);
    }
  },
);

export default authRoute;
