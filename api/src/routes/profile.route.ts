import { Router } from 'express';
import { verifyToken } from '../middleware/jwt.js';
import getUserPosts, {
  getUserProfileData,
} from '../controllers/get/getUserData.js';
import validResult from '../validators/validationResult.js';
import { updatePersonalDataValidator } from '../validators/authValidators.js';
import updateUserDetails from '../controllers/put/updateUserProfile.js';

const profileRoute = Router();

profileRoute.get('/getUserPosts/:authorId', verifyToken, getUserPosts);
profileRoute.get('/getUserProfile/:userId', verifyToken, getUserProfileData);

profileRoute.put(
  '/updatePersonalProfile',
  verifyToken,
  updatePersonalDataValidator,
  validResult,
  updateUserDetails,
);

export default profileRoute;
