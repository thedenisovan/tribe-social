import { Router } from 'express';
import { verifyToken } from '../middleware/jwt.js';
import getUserPosts, {
  getUserProfileData,
} from '../controllers/get/getUserPosts.js';

const profileRoute = Router();

profileRoute.get('/getUserPosts/:authorId', verifyToken, getUserPosts);
profileRoute.get('/getUserProfile/:userId', verifyToken, getUserProfileData);

export default profileRoute;
