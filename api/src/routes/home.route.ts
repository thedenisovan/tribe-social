import { Router } from 'express';
import newPost from '../controllers/post/newPost.js';
import { verifyToken } from '../middleware/jwt.js';
import getPosts from '../controllers/get/getPosts.js';

const homeRoute = Router();

homeRoute.get('/getPosts', verifyToken, getPosts);
homeRoute.post('/newPost', verifyToken, newPost);

export default homeRoute;
