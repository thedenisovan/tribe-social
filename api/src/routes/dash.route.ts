import { Router } from 'express';
import { verifyToken } from '../middleware/jwt.js';
import deletePost from '../controllers/delete/deletePost.js';
import likePost from '../controllers/put/likePost.js';
import type User from '../types/user.js';
import { getPost } from '../controllers/get/getUserData.js';

const dashRoute = Router();

dashRoute.get('/getUserId', verifyToken, (req, res, next) => {
  try {
    if (!req.user) {
      return next(new Error('Could not extract user object from request.'));
    }

    // Remove hashed password from user obj
    const { hashedPassword, ...clone } = req.user as User;

    return res.json({ decoded: clone });
  } catch (e) {
    next(e);
  }
});
dashRoute.get('/getPost/:postId', verifyToken, getPost);

dashRoute.post('/deletePost', verifyToken, deletePost);

dashRoute.put('/likePost', verifyToken, likePost);

export default dashRoute;
