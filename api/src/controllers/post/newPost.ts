import prismaNeon from '../../db/prisma.js';
import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../../middleware/errorMiddleware.js';

export default async function newPost(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { postData, authorId } = req.body;

    const authorIdInt = Number(authorId);

    if (!postData || !authorIdInt || isNaN(authorIdInt)) {
      return next(
        new HttpError(
          `No or incorrect values were provided for request body.`,
          400,
        ),
      );
    } else if (postData.trim() === '' || postData.trim().length >= 500) {
      return next(
        new HttpError(
          `Post data must be between one and 500 characters long.`,
          400,
        ),
      );
    }

    // Create new post
    const post = await prismaNeon.post.create({
      data: { postData: postData.trim(), authorId },
    });

    return res.status(201).json({ post });
  } catch (e) {
    next(e);
  }
}
