import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../../middleware/errorMiddleware.js';
import prismaNeon from '../../db/prisma.js';

export default async function deletePost(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { postId } = req.body;
  if (!postId) {
    return next(new HttpError('No post id provided', 400));
  }

  const intPostId = Number(postId);
  const intAuthorId = Number(req.userId);

  if (isNaN(intPostId)) {
    return next(new HttpError('Post id is NaN', 400));
  }

  try {
    // Delete posts
    await prismaNeon.post.delete({
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
}
