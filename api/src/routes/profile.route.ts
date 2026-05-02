import { Router } from 'express';
import { verifyToken } from '../middleware/jwt.js';
import getUserPosts from '../controllers/getUserPosts.js';

const profileRoute = Router();

profileRoute.get('/getUserPosts/:authorId', verifyToken, getUserPosts);

export default profileRoute;
