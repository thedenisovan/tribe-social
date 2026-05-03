import { Router } from 'express';
import { verifyToken } from '../middleware/jwt.js';
import type User from '../types/user.js';
import { HttpError } from '../middleware/errorMiddleware.js';
import prismaNeon from '../db/prisma.js';

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

dashRoute.post('/deletePost', verifyToken, async (req, res, next) => {
  const { postId, authorId } = req.body;
  if (!postId || !authorId) {
    return next(new HttpError('No post id provided', 400));
  }

  const intPostId = Number(postId);
  const intAuthorId = Number(authorId);

  if (isNaN(intPostId)) {
    return next(new HttpError('Post id is NaN', 400));
  }

  try {
    // Delete posts
    await prismaNeon.post.deleteMany({
      where: { id: intPostId, authorId: intAuthorId },
    });

    // Get all posts except deleted
    const posts = await prismaNeon.post.findMany({
      where: { authorId: intAuthorId },
    });

    return res.status(201).json({ posts });
  } catch (e) {
    next(e);
  }
});

export default dashRoute;
