import { Router } from 'express';
import * as validator from '../validators/authValidators.js';
import validResult from '../validators/validationResult.js';
import registerUser from '../controllers/registerUser.js';
import passport from 'passport';
import generateJwtToken from '../middleware/jwt.js';

const authRoute = Router();

authRoute.post('/signup', validator.signupValidator, validResult, registerUser);
authRoute.post(
  '/signin',
  validator.signinValidator,
  validResult,
  passport.authenticate('local', { session: false }),
  generateJwtToken,
);

export default authRoute;
