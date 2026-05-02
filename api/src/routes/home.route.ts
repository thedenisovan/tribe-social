import { Router } from 'express';
import newPost from '../controllers/post/newPost.js';
import { verifyToken } from '../middleware/jwt.js';

const homeRoute = Router();

homeRoute.post('/newPost', verifyToken, newPost);

export default homeRoute;
