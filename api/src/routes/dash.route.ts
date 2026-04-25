import { Router } from 'express';
import { verifyToken } from '../middleware/jwt.js';
import type User from '../types/user.js';

const dashRoute = Router();

dashRoute.get('/getUserData', verifyToken, (req, res, next) => {
  try {
    if (!req.user) {
      return next(new Error('Could not extract user object from request.'));
    }

    // Remove hashed password from user obj
    const { hashedPassword, ...clone } = req.user as User;

    return res.json({ user: clone });
  } catch (e) {
    next(e);
  }
});

export default dashRoute;
