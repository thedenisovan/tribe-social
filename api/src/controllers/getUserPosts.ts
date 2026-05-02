import prismaNeon from '../db/prisma.js';
import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../middleware/errorMiddleware.js';

export default async function getUserPosts(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { authorId } = req.params;

    if (!authorId) {
      return next(new HttpError(`No author id provided.`, 400));
    }

    const authorIntId = Number(authorId);

    if (!authorIntId || isNaN(authorIntId)) {
      return next(
        new HttpError(
          `No or incorrect values were provided for request body.`,
          400,
        ),
      );
    }

    // Create new post
    const posts = await prismaNeon.post.findMany({
      where: { authorId: authorIntId },
    });

    return res.status(201).json(posts);
  } catch (e) {
    next(e);
  }
}
